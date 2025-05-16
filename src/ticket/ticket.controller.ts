import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}
  @Post()
  async createTicket(@Body() ticketData: Partial<Ticket>) {
    return await this.ticketService.create(ticketData);
  }
  @Get(':code')
  async getTicketByCode(@Param('code') code: string) {
    return await this.ticketService.findByCode(code);
  }
  @Get()
  async getAllTickets() {
    return await this.ticketService.getAll();
  }
}
