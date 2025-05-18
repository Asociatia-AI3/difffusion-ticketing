import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { TicketProcessingService } from './ticket.processing.service';
import { UserDto } from '../dto/user.dto';

@Controller('process')
export class TicketProcessingController {
  constructor(private ticketProcessingService: TicketProcessingService) {}

  @Post()
  async generate(@Body() userDto: UserDto) {
    const code = await this.ticketProcessingService.generate(userDto);
    return { code };
  }

  @Get()
  async scan(@Query('code') code: string) {
    const isValid = await this.ticketProcessingService.scan(code);

    if (!isValid) {
      throw new BadRequestException('Invalid code');
    }

    return { message: 'Code is valid' };
  }
}
