import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TicketUseRepository } from './ticket_use.repository';
import { TicketRepository } from '../ticket/ticket.repository';
import { DiscountRepository } from '../discounts/discount.repository';
import { Ticket } from '../ticket/ticket.entity';
import { Discount } from '../discounts/discount.entity';

@Injectable()
export class TicketUseService {
  constructor(
    private readonly ticketUseRepo: TicketUseRepository,
    private readonly ticketRepo: TicketRepository,
    private readonly discountRepo: DiscountRepository
  ) {}

  async registerUse(ticketId: string, discountId: string) {
    const ticket = await this.ticketRepo.findById(ticketId);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    const discount = await this.discountRepo.findById(discountId);
    if (!discount) {
      throw new NotFoundException('Discount not found');
    }

  
    const existingUse = await this.ticketUseRepo.findByTicketAndDiscount(ticketId, discountId);
    if (existingUse) {
      throw new BadRequestException('Ticket already used for this discount');
    }

   
    const uses = await this.ticketUseRepo.countByDiscount(discountId);
    if (uses >= discount.maxUses) {
      throw new BadRequestException('Discount has reached max usage');
    }

   
    return this.ticketUseRepo.create({
      ticket,
      discount,
      createdAt: Date.now()
    });
  }

  getAllUses() {
    return this.ticketUseRepo.findAll();
  }
}
