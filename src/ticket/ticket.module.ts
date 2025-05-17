import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { TicketService } from './ticket.service';
import { TicketRepository } from './ticket.repository';
import { TicketController } from './ticket.controller';
import { TicketUseModule } from 'src/ticket-use/ticket_use.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => TicketUseModule),
  ],
  providers: [TicketService, TicketRepository],
  controllers: [TicketController],
  exports: [TicketService],
})
export class TicketModule {}
