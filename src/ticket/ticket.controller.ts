import { Controller, Post, Body, Headers, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { TicketService } from './ticket.service';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post()
  async generateTicket() {
    try {
      return await this.ticketService.generateTicket();
    } catch (error) {
      throw new BadRequestException('Failed to generate ticket');
    }
  }

  @Post('validate')
  async validateTicket(@Body() body: { code: string }) {
    if (!body?.code) {
      throw new BadRequestException('Ticket code is required');
    }
    return this.ticketService.validateTicket(body.code);
  }

  @Post('use')
  async useDiscount(
    @Headers('authorization') auth: string,
    @Body() body: { code: string }
  ) {
    if (!auth || !auth.startsWith('Basic ')) {
      throw new UnauthorizedException('Invalid credentials');
    }
    if (!body?.code) {
      throw new BadRequestException('Ticket code is required');
    }
    return this.ticketService.useDiscount(body.code);
  }
}