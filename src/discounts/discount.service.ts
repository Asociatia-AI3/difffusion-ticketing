import { Injectable } from '@nestjs/common';
import { DiscountRepository } from './discount.repository';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(private readonly discountRepo: DiscountRepository) {}

  create(discountData: Partial<Discount>): Promise<Discount> {
    return this.discountRepo.create(discountData);
  }

  findAll(): Promise<Discount[]> {
    return this.discountRepo.findAll();
  }

  findById(id: string): Promise<Discount | null> {
    return this.discountRepo.findById(id);
  }
}

