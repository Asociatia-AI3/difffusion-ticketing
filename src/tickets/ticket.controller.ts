import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  //Create
  @Post()
  create(@Body() ticket: Ticket): Promise<Ticket> {
    return this.ticketService.create(ticket);
  }

  //Read-All
  @Get()
  getAll(): Promise<Ticket[]> {
    return this.ticketService.findAll();
  }

  //Read-One
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Ticket | null> {
    return this.ticketService.findById(id);
  }

  //Update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Ticket>,
  ): Promise<void> {
    return this.ticketService.update(id, update);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketService.delete(id);
  }
}
