import {Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Ticket} from './ticket.entity';
import {TicketService} from './ticket.service';
import { TicketRepository } from './ticket.repository';
import { QrModule } from 'src/qr/qr.module';


@Module({
    imports: [TypeOrmModule.forFeature([Ticket]), QrModule],
    providers: [TicketService, TicketRepository],
    exports: [TicketService],
})
export class TicketModule{}

