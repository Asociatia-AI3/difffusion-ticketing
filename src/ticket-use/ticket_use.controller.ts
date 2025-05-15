import { Controller, Post, Body, Get } from '@nestjs/common';
import { TicketUseService } from './ticket_use.service';

@Controller('ticket-uses')
export class TicketUseController {
  constructor(private readonly ticketUseService: TicketUseService) {}

  @Post()
  async registerUse(@Body() body: { ticketId: string; discountId: string }) {
    return await this.ticketUseService.registerUse(
      body.ticketId,
      body.discountId,
    );
  }

  @Get()
  async getAll() {
    return await this.ticketUseService.getAllUses();
  }
}
