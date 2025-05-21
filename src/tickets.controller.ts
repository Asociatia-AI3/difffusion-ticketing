import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    HttpCode,
    HttpStatus
} from '@nestjs/common';

import { TicketService } from './ticket/ticket.service';
import { Ticket } from './ticket/ticket.entity';

@Controller('tickets')
export class TicketController {
    constructor(private readonly ticketService: TicketService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Ticket[]> {
        return this.ticketService.findAll();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() ticketData: Partial<Ticket>): Promise<Ticket> {
        return this.ticketService.create(ticketData);
    }
}