import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { ormConfig } from './config/orm.config';
import { TicketModule } from './ticket/ticket.module';
import { PartnerModule } from './partner/partner.module';
import { VenueModule } from './venue/venue.module';
import { DiscountModule } from './discounts/discount.module';

const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    TicketModule,
    VenueModule,
    PartnerModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
