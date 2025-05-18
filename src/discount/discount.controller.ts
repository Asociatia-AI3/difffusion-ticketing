import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';

@Controller('discount')
export class DiscountController {
  constructor(private readonly discountService: DiscountService) {}

  //Create
  @Post()
  create(@Body() discount: Discount): Promise<Discount> {
    return this.discountService.create(discount);
  }

  //Read-All
  @Get()
  getAll(): Promise<Discount[]> {
    return this.discountService.findAll();
  }

  //Read-One
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Discount | null> {
    return this.discountService.findById(id);
  }

  //Update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Discount>,
  ): Promise<void> {
    return this.discountService.update(id, update);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.discountService.delete(id);
  }
}
