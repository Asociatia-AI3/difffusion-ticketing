import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { TicketModule } from '../ticket/ticket.module';
import { UserController } from 'src/user/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TicketModule], // needed for DI to work
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
