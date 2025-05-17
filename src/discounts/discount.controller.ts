import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DiscountService } from './discount.service';
import { Discount } from './discount.entity';

@Controller('discounts')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}
  @Get()
  async findAll() {
    return await this.discountService.findAll();
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.discountService.findById(id);
  }
  @Post()
  async create(@Body() data: Partial<Discount>) {
    return await this.discountService.create(data);
  }

  @Get('/venue/:id')
  async findByVenueId(@Param('id') id: string) {
    const data = await this.discountService.findByVenueId(id);
    console.log('id', id);
    console.log('data', data);
    return {
      discounts: data,
    };
  }
}
