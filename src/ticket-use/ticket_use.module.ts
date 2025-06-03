import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketUse } from './ticket_use.entity';
import { TicketUseRepository } from './ticket_use.repository';
import { TicketUseService } from './ticket_use.service';
import { TicketUseController } from './ticket_use.controller';
import { TicketModule } from 'src/ticket/ticket.module';
import { DiscountModule } from 'src/discounts/discount.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketUse]),
    forwardRef(() => TicketModule),
    DiscountModule,
  ],
  exports: [TicketUseService],
  providers: [TicketUseRepository, TicketUseService],
  controllers: [TicketUseController],
})
export class TicketUseModule {}
