import { Injectable } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './ticket.entity';

@Injectable()
export class TicketService {
    constructor(
        private readonly ticketRepo: TicketRepository,
    ){}

    async create(ticketData: Partial<Ticket>): Promise<Ticket> {
        return await this.ticketRepo.create(ticketData);
    }

    async findByCode(code: string): Promise<Ticket | null> {
        return this.ticketRepo.findByCode(code);
    }

    async useTicket(code: string): Promise<boolean> {
        const ticket = await this.findByCode(code);
        if(!ticket || ticket.uses >= ticket.maxUses) return false;

        ticket.uses += 1;
        await this.ticketRepo.save(ticket);
        return true;
    }
}