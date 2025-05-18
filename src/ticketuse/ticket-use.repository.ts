import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TicketUse } from './ticket-use.entity';

@Injectable()
export class TicketUseRepository {
  private readonly repo: Repository<TicketUse>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(TicketUse);
  }

  async create(ticketUse: TicketUse): Promise<TicketUse> {
    return this.repo.save(this.repo.create(ticketUse));
  }

  async findAll(): Promise<TicketUse[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<TicketUse | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, partial: Partial<TicketUse>): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findAllByTicketId(ticketId: string): Promise<TicketUse[] | null> {
    return this.repo.find({
      where: {
        ticket: {
          id: ticketId,
        },
      },
    });
  }
}
