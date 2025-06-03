import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number): Promise<User | null> {
    return this.userService.getById(id);
  }

  @Post()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.delete(+id);
=======
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
