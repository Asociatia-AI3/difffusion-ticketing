import { Injectable } from '@nestjs/common';
import { DiscountRepository } from './discount.repository';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountService {
  constructor(private readonly discountRepo: DiscountRepository) {}

  async create(discountData: Partial<Discount>): Promise<Discount> {
    return await this.discountRepo.create(discountData);
  }

  async findAll(): Promise<Discount[]> {
    return await this.discountRepo.findAll();
  }

  async findById(id: string): Promise<Discount | null> {
    return await this.discountRepo.findById(id);
  }

  async findByVenueId(venueId: string): Promise<Discount[]> {
    return await this.discountRepo.findByVenueId(venueId);
  }

  async update(id: string): Promise<Discount | null> {
    return await this.discountRepo.update(id);
  }
}
