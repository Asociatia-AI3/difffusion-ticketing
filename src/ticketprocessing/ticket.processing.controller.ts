import { Controller, Get, Post } from '@nestjs/common';
import { TicketProcessingService } from './ticket.processing.service';

@Controller('process')
export class TicketProcessingController {
  constructor(private ticketProcessingService: TicketProcessingService) {}

  @Get()
  generate() {
    return this.ticketProcessingService.generate();
  }

  @Post()
  scan() {
    return this.ticketProcessingService.scan();
  }
}
