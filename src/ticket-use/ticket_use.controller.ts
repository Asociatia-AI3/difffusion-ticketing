import { Controller, Post, Body, Get } from '@nestjs/common';
import { TicketUseService } from './ticket_use.service';
import { UseGuards } from '@nestjs/common';

@Controller('ticketuses')
export class TicketUseController {
  constructor(private readonly ticketUseService: TicketUseService) {}

  @Post()
  registerUse(
    @Body() body: { ticketId: string; discountId: string },
  ) {
    return this.ticketUseService.registerUse(body.ticketId, body.discountId);
  }

  @Get()
  getAll() {
    return this.ticketUseService.getAllUses();
  }
}
