import { Body, Controller, Get, Post } from '@nestjs/common';
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
  scan() {
    return this.ticketProcessingService.scan();
  }
}
