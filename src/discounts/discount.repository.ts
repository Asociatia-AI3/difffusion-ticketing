import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountRepository {
  private readonly repo: Repository<Discount>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Discount);
  }

  create(discountData: Partial<Discount>): Promise<Discount> {
    const discount = this.repo.create(discountData);
    return this.repo.save(discount);
  }

  findAll(): Promise<Discount[]> {
    return this.repo.find({ relations: ['venue'] });
  }

  findById(id: string): Promise<Discount | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['venue'],
    });
  }
}
