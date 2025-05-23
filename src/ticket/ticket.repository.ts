import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketRepository {
  findById(ticketId: string) {
    throw new Error('Method not implemented.');
  }
  private readonly repo: Repository<Ticket>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Ticket);
  }

  create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.repo.create(ticketData);
    return this.repo.save(ticket);
  }

  findByCode(code: string): Promise<Ticket | null> {
    return this.repo.findOneBy({ code });
  }

  save(ticket: Ticket): Promise<Ticket> {
  return this.repo.save(ticket);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
