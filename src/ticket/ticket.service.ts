import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { Ticket } from './ticket.entity';
import { QrService } from 'src/qr/qr.service';

@Injectable()
export class TicketService {
    constructor(
        private readonly ticketRepo: TicketRepository,
        private readonly qrService: QrService
    ){}

    async create(ticketData: Partial<Ticket>): Promise<Ticket> {
        return await this.ticketRepo.create(ticketData);
    }

    async findByCode(code: string): Promise<Ticket | null> {
        return this.ticketRepo.findByCode(code);
    }

    findAll(): Promise<Ticket[]> {
        return this.ticketRepo.findAll();
    }

    async generateQr(ticketId: string): Promise<string> {
        const ticket = await this.ticketRepo.findOneById(ticketId);
        if (!ticket) throw new NotFoundException('Ticket not found');

        const data = `Ticket:${ticket.id}|Code:${ticket.code}`;
        return this.qrService.generateQrCode(data);
}

}