import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepo: TicketRepository) {}
  async getAll(): Promise<Ticket[]> {
    return this.ticketRepo.findAll();
  }
  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    return await this.ticketRepo.create(ticketData);
  }

  async findByCode(code: string): Promise<Ticket | null> {
    return this.ticketRepo.findByCode(code);
  }
  async findAllByUserId(userId: string): Promise<Ticket[]> {
    return this.ticketRepo.findAllByUserId(userId);
  }
}
