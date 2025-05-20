import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    getAll(): Promise<Ticket[]> {
        return this.ticketService.findAll();
    }

    @Get(':id/qr')
        async getTicketQr(@Param('id') id: string): Promise<string> {
        return this.ticketService.generateQr(id);
    }

    @Get(':code')
    getOneByCode(@Param('code') code: string): Promise<Ticket | null> {
        return this.ticketService.findByCode(code);
    }

    @Post()
    create(@Body() ticketData: Partial<Ticket>): Promise<Ticket> {
        return this.ticketService.create(ticketData);
    }
} 