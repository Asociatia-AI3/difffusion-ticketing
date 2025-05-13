import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './discount.entity';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  @Post()
  create(@Body() discountData: Partial<Discount>): Promise<Discount> {
    return this.discountService.create(discountData);
  }

  @Get()
  findAll(): Promise<Discount[]> {
    return this.discountService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Discount | null> {
    return this.discountService.findById(id);
  }
}

