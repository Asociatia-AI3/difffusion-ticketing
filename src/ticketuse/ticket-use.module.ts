import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketUseService } from './ticket-use.service';
import { TicketUseRepository } from './ticket-use.repository';
import { TicketUse } from './ticket-use.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TicketUse])],
  providers: [TicketUseService, TicketUseRepository],
  exports: [TicketUseService],
})
export class TicketUseModule {}
