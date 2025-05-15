import { Injectable } from '@nestjs/common';
import { TicketUseRepository } from './ticket_use.repository';
import { Ticket } from '../ticket/ticket.entity';
import { Discount } from '../discounts/discount.entity';

@Injectable()
export class TicketUseService {
  constructor(private readonly ticketUseRepo: TicketUseRepository) {}

  async registerUse(ticketId: string, discountId: string) {
    return this.ticketUseRepo.create({
      ticket: { id: ticketId } as Ticket,
      discount: { id: discountId } as Discount,
      createdAt: Date.now(),
    });
  }

  getAllUses() {
    return this.ticketUseRepo.findAll();
  }
}
