import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { VenueService } from '../venue/venue.service';
import { TicketUseService } from '../ticketuse/ticket-use.service';
import { TicketService } from '../tickets/ticket.service';
import { UserDto } from '../dto/user.dto';
import { Ticket } from '../tickets/ticket.entity';
import { v4 as uuid } from 'uuid';
import { TicketUse } from '../ticketuse/ticket-use.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TicketProcessingService {
  constructor(
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
    private readonly ticketUseService: TicketUseService,
    private readonly venueService: VenueService,
  ) {}

  async generate(userDto: UserDto) {
    const user = await this.userService.findByEmail(userDto.email);

    if (user) {
      //user found
      return await this.createTicket(user);
    } else {
      //user not found -> create user
      let user = new User();
      user.name = userDto.name;
      user.email = userDto.email;
      user.mobile = userDto.phone;
      user = await this.userService.create(user);
      return await this.createTicket(user);
    }
  }

  private async createTicket(user: User) {
    //create ticket
    let ticket = new Ticket();
    ticket.user = user;
    ticket.code = uuid();
    ticket = await this.ticketService.create(ticket);

    //select a random venue
    const venues = await this.venueService.findAll();
    const randomVenue = venues[Math.floor(Math.random() * venues.length)];
    const discounts = await randomVenue.discounts;
    //select a random discount
    const randomDiscount =
      discounts[Math.floor(Math.random() * discounts.length)];

    //create ticket uses based on discount max use
    //ticket use will be deleted when ticket is scanned
    for (let i = 0; i < randomDiscount.max_uses; i++) {
      const ticketUse = new TicketUse();
      ticketUse.ticket = ticket;
      ticketUse.discount = randomDiscount;
      ticketUse.createdAt = Date.now();
      await this.ticketUseService.create(ticketUse);
    }
    return ticket.code;
  }

  async scan(code: string): Promise<boolean> {
    const ticket = await this.ticketService.findByCode(code);
    //ticket found
    if (ticket) {
      const ticketUses = await this.ticketUseService.getTicketUsesForTicket(
        ticket.id,
      );
      //usages found -> remove a usage
      if (ticketUses && ticketUses.length > 0) {
        const ticketUse =
          ticketUses[Math.floor(Math.random() * ticketUses.length)];
        await this.ticketUseService.delete(ticketUse.id);
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
