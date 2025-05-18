import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ormConfig } from './config/orm.config';


import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { PartnerController } from './partner/partner.controller';
import { PartnerService } from './partner/partner.service';
import { PartnerModule } from './partner/partner.module';
import { TicketUseController } from './ticket-use/ticket_use.controller';
import { TicketUseService } from './ticket-use/ticket_use.service';
import { TicketModule } from './ticket/ticket.module';
import { VenueController } from './venue/venue.controller';
import { VenueService } from './venue/venue.service';
import { DiscountModule } from './discounts/discount.module';
import { DiscountController } from './discounts/discount.controller';
import { DiscountService } from './discounts/discount.service';
import { DiscountRepository } from './discounts/discount.repository';
import { VenueRepository } from './venue/venue.repository';
import { TicketUseRepository } from './ticket-use/ticket_use.repository';
import { PartnerRepository } from './partner/partner.repository';
import { UserRepository } from './user/user.repository';
import { TicketUseModule } from './ticket-use/ticket_use.module';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { TicketRepository } from './ticket/ticket.repository';



const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    TicketModule,
    DiscountModule,
    PartnerModule,
    TicketUseModule
  ],
  controllers: [AppController, UserController, PartnerController, TicketUseController, VenueController, DiscountController, TicketController],
  providers: [AppService, DiscountService, VenueService, TicketUseService, PartnerService, UserService, DiscountRepository, VenueRepository, TicketUseRepository, PartnerRepository, UserRepository, TicketService, TicketRepository],
})
export class AppModule {}
