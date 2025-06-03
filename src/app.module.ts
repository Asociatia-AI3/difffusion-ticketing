import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserController } from './user.controller';
import { TicketModule } from './ticket/ticket.module';
import { AdminController } from './admin/admin.controller';
import { AdminService } from './admin/admin.service';
import { User } from './user/user.entity';
import { Ticket } from './ticket/ticket.entity';
import { ormConfig } from './config/orm.config';
import { LoginController } from './login.controller';

const dbConfig = {
  ...ormConfig,
  autoLoadEntities: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),

    // Bu satır HATAYI çözer:
    TypeOrmModule.forFeature([User, Ticket]),

    UserModule,
    TicketModule,
  ],
  controllers: [AppController, UserController, AdminController, LoginController],
  providers: [AppService, AdminService],
})
export class AppModule {}
