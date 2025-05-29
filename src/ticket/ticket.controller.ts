import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import * as QRCode from 'qrcode';
import { TicketUseService } from 'src/ticket-use/ticket_use.service';

@Controller('tickets')
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly ticketUseService: TicketUseService,
  ) {}
  @Post()
  async createTicket(@Body() ticketData: Partial<Ticket>) {
    if (!ticketData.code) {
      throw new BadRequestException('Ticket code is required');
    }
    if (!ticketData.user) {
      throw new BadRequestException('User ID is required');
    }
    const qrDataUrl = await QRCode.toDataURL(ticketData.code);
    if (!qrDataUrl) {
      throw new BadRequestException('Failed to generate QR code');
    }

    const ticket = await this.ticketService.create({
      code: ticketData.code,
      user: ticketData.user,
    });
    return {
      ticket: ticket,
      qrDataUrl: qrDataUrl,
    };
  }
  @Get(':code')
  async getTicketByCode(@Param('code') code: string) {
    return await this.ticketService.findByCode(code);
  }

  @Get('get-all-tickets/:userId')
  async getAllTickets(@Param('userId') userId: string) {
    const tickets = await this.ticketService.findAllByUserId(userId);
    if (!tickets) {
      console.log('No tickets found for this user');
      return null;
    }
    const allUses = await this.ticketUseService.getAllUses();
    console.log('allUses', allUses);
    const filteredTickets = tickets.filter((ticket) => {
      const ticketUse = allUses.find((use) => use.ticket.id === ticket.id);
      return !ticketUse;
    });

    const ticketsDto = await Promise.all(
      filteredTickets.map(async (ticket) => {
        const qrDataUrl = await QRCode.toDataURL(ticket.code);
        return { ...ticket, code: qrDataUrl };
      }),
    );

    return { tickets: ticketsDto };
  }
}
