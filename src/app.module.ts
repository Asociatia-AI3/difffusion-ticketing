import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ormConfig } from './config/orm.config';
import { PartnerController } from './partner/partner.controller';
import { VenueController } from './venue/venue.controller';
import { DiscountController } from './discount/discount.controller';
import { TicketController } from './tickets/ticket.controller';
import { TicketUseController } from './ticketuse/ticket-use.controller';
import { TicketModule } from './tickets/ticket.module';
import { PartnerModule } from './partner/partner.module';
import { VenueModule } from './venue/venue.module';
import { DiscountModule } from './discount/discount.module';
import { TicketUseModule } from './ticketuse/ticket-use.module';

const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    PartnerModule,
    VenueModule,
    DiscountModule,
    TicketModule,
    TicketUseModule,
  ],
  controllers: [
    AppController,
    UserController,
    PartnerController,
    VenueController,
    DiscountController,
    TicketController,
    TicketUseController,
  ],
  providers: [AppService],
})
export class AppModule {}
