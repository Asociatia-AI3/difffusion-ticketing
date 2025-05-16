import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketUse } from './ticket_use.entity';
import { TicketUseRepository } from './ticket_use.repository';
import { TicketUseService } from './ticket_use.service';
import { TicketUseController } from './ticket_use.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TicketUse])],
  providers: [TicketUseRepository, TicketUseService],
  controllers: [TicketUseController],
  exports: [TicketUseService],
})
export class TicketUseModule {}
