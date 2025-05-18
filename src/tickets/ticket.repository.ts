import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketRepository {
  private readonly repo: Repository<Ticket>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Ticket);
  }

  async create(ticket: Ticket): Promise<Ticket> {
    return this.repo.save(this.repo.create(ticket));
  }

  async findAll(): Promise<Ticket[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Ticket | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, partial: Partial<Ticket>): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findByCode(code: string): Promise<Ticket | null> {
    return this.repo.findOne({ where: { code } });
  }
}
