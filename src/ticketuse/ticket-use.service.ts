import { Injectable } from '@nestjs/common';
import { TicketUseRepository } from './ticket-use.repository';
import { TicketUse } from './ticket-use.entity';

@Injectable()
export class TicketUseService {
  constructor(private readonly ticketUseRepository: TicketUseRepository) {}

  create(ticketUse: TicketUse): Promise<TicketUse> {
    return this.ticketUseRepository.create(ticketUse);
  }

  findAll(): Promise<TicketUse[]> {
    return this.ticketUseRepository.findAll();
  }

  findById(id: string): Promise<TicketUse | null> {
    return this.ticketUseRepository.findById(id);
  }

  update(id: string, partial: Partial<TicketUse>): Promise<void> {
    return this.ticketUseRepository.update(id, partial);
  }

  delete(id: string): Promise<void> {
    return this.ticketUseRepository.delete(id);
  }
}
