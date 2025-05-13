import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';
import { DiscountRepository } from './discount.repository';
import { DiscountController } from './discount.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Discount])],
  providers: [DiscountService, DiscountRepository],
  controllers: [DiscountController],
  exports: [DiscountService],
})
export class DiscountModule {}

