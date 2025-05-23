import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user.controller';
import { ormConfig } from './config/orm.config';
import { TicketModule } from './ticket/ticket.module';
import { TicketUseModule } from './ticket-use/ticket_use.module';

const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true
}

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    UserModule,
    TicketModule,
    TicketUseModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
