import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketUseService } from './ticket-use.service';
import { TicketUse } from './ticket-use.entity';

@Controller('ticket-use')
export class TicketUseController {
  constructor(private readonly ticketUseService: TicketUseService) {}

  //Create
  @Post()
  create(@Body() ticketUse: TicketUse): Promise<TicketUse> {
    return this.ticketUseService.create(ticketUse);
  }

  //Read-All
  @Get()
  getAll(): Promise<TicketUse[]> {
    return this.ticketUseService.findAll();
  }

  //Read-One
  @Get(':id')
  getOne(@Param('id') id: string): Promise<TicketUse | null> {
    return this.ticketUseService.findById(id);
  }

  //Update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<TicketUse>,
  ): Promise<void> {
    return this.ticketUseService.update(id, update);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ticketUseService.delete(id);
  }
}
