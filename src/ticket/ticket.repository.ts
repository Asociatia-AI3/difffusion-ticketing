import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketRepository {
  private readonly repo: Repository<Ticket>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return await this.repo.find();
  }
  async create(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.repo.create(ticketData);
    return await this.repo.save(ticket);
  }

  async findByCode(code: string): Promise<Ticket | null> {
    return await this.repo.findOne({
      where: { code },
      relations: ['user'],
    });
  }

  async save(ticket: Ticket): Promise<Ticket> {
    return await this.repo.save(ticket);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findAllByUserId(userId: string): Promise<Ticket[]> {
    return this.repo.findBy({ user: { id: userId } });
  }
}
