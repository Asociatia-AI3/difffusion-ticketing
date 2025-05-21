import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user.controller';
import { ormConfig } from './config/orm.config';
import { TicketModule } from './ticket/ticket.module';
import { PartnerModule } from './partner/partner.module';
import { TicketUseModule } from './ticket-use/ticket_use.module';
import { VenueModule } from './venue/venue.module';
import { TicketController } from './tickets.controller';
import { DiscountController } from './discounts/discount.controller';
import { PartnerController } from './partner/partner.controller';
import { TicketUseController } from './ticket-use/ticket_use.controller';
import { VenueController } from './venue/venue.controller';

const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    TicketModule,
    PartnerModule,
    TicketUseModule,
    VenueModule,
  ],
  controllers: [AppController, UserController,
    TicketController,
    DiscountController,
    PartnerController,
    TicketUseController,
    VenueController
  ],
  providers: [AppService],
})
export class AppModule { }
