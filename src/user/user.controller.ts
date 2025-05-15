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

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Render('user')
  async getAll() {
    return { allusers: JSON.stringify(await this.userService.getAll()) };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<User | null> {
    return await this.userService.getById(id);
  }

  @Post()
  async create(@Body() userData: Partial<User>) {
    await this.userService.create(userData);
    return {};
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
