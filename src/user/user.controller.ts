import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Render,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { TicketService } from 'src/ticket/ticket.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private ticketService: TicketService,
  ) {}

  @Get()
  @Render('user')
  async getAll() {
    return { allusers: await this.userService.getAll() };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getById(id);
  }

  @Get('email/:email')
  async getByEmail(@Param('email') email: string) {
    console.log('email', email);
    const user = await this.userService.getByEmail(email);
    if (!user) {
      console.log('User not found');
      return null;
    }
    return { user: user };
  }

  @Post()
  async create(@Body() userData: Partial<User>) {
    await this.userService.create(userData);
    return { message: 'User created successfully' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
