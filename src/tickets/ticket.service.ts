import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  create(ticket: Ticket): Promise<Ticket> {
    return this.ticketRepository.create(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.findAll();
  }

  findById(id: string): Promise<Ticket | null> {
    return this.ticketRepository.findById(id);
  }

  update(id: string, partial: Partial<Ticket>): Promise<void> {
    return this.ticketRepository.update(id, partial);
  }

  delete(id: string): Promise<void> {
    return this.ticketRepository.delete(id);
  }

  async findByCode(code: string): Promise<Ticket | null> {
    return this.ticketRepository.findByCode(code);
  }
}
