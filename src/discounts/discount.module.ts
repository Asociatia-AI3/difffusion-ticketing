import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discount } from './discount.entity';
import { DiscountService } from './discount.service';
import { DiscountRepository } from './discount.repository';
import { DiscountController } from './discount.controller';
import { VenueModule } from 'src/venue/venue.module';

@Module({
  imports: [TypeOrmModule.forFeature([Discount]), VenueModule],
  providers: [DiscountService, DiscountRepository],
  controllers: [DiscountController],
  exports: [DiscountService],
})
export class DiscountModule {}
