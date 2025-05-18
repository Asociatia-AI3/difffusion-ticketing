import { Injectable } from '@nestjs/common';
import { DiscountRepository } from './discount.repository';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(private readonly discountRepository: DiscountRepository) {}

  create(discount: Discount): Promise<Discount> {
    return this.discountRepository.create(discount);
  }

  findAll(): Promise<Discount[]> {
    return this.discountRepository.findAll();
  }

  findById(id: string): Promise<Discount | null> {
    return this.discountRepository.findById(id);
  }

  update(id: string, partial: Partial<Discount>): Promise<void> {
    return this.discountRepository.update(id, partial);
  }

  delete(id: string): Promise<void> {
    return this.discountRepository.delete(id);
  }
}
