import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountRepository {
  private readonly repo: Repository<Discount>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Discount);
  }

  async create(discountData: Partial<Discount>): Promise<Discount> {
    const discount = this.repo.create(discountData);
    return await this.repo.save(discount);
  }

  async findAll() {
    return await this.repo.find({ relations: ['venue'] });
  }

  async findById(id: string): Promise<Discount | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['venue'],
    });
  }

  async findByVenueId(venueId: string): Promise<Discount[]> {
    return await this.repo.find({
      where: { venue: { id: venueId } },
    });
  }

  async update(id: string): Promise<Discount | null> {
    const discount = await this.findById(id);
    if (!discount) {
      return null;
    }
    discount.maxUses -= 1;
    return await this.repo.save(discount);
  }
}
