import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { TicketService } from './ticket/ticket.service';
import { Ticket } from './ticket/ticket.entity';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    getAll(): Promise<Ticket[]> {
        return this.ticketService.findAll();
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