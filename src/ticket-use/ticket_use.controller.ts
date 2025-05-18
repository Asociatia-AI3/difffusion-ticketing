/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Controller, Post, Body, Get } from '@nestjs/common';
import { TicketUseService } from './ticket_use.service';
import { TicketService } from 'src/ticket/ticket.service';
import { DiscountService } from 'src/discounts/discount.service';

@Controller('ticket-uses')
export class TicketUseController {
  constructor(
    private readonly ticketUseService: TicketUseService,
    private readonly ticketService: TicketService,
    private readonly discountService: DiscountService,
  ) {}

  @Post()
  async registerUse(@Body() body: { ticketCode: string; discountId: string }) {
    const isExist = await this.ticketService.findByCode(body.ticketCode);
    console.log('isExist', isExist);
    if (!isExist) {
      return { message: 'Ticket not found' };
    }
    const allUses = await this.ticketUseService.getAllUses();
    const isUsed = allUses.find((use) => use.ticket.id === isExist.id);
    if (isUsed) {
      return { message: 'Ticket already used' };
    }
    const ticketUse = await this.ticketUseService.registerUse(
      isExist.id,
      body.discountId,
    );

    if (ticketUse) {
      console.log('Ticket use registered successfully', ticketUse);
      await this.discountService.update(ticketUse.discount.id);
    }

    return {
      message: 'Ticket use registered successfully',
      isValid: true,
      discountName: ticketUse.discount.name,
      userName: isExist.user.name,
    };
  }

  @Get()
  async getAll() {
    return await this.ticketUseService.getAllUses();
  }
}
