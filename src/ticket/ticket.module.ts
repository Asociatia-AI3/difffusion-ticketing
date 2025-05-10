import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Ticket} from './ticket.entity';
import {TicketService} from './ticket.service';
import { TicketRepository } from './ticket.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket])],
    providers: [TicketService, TicketRepository],
    exports: [TicketService],
})
export class TicketModule{}

