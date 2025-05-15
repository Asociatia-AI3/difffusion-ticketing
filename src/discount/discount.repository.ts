import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Discount } from './discount.entity';

@Injectable()
export class DiscountRepository {
  private readonly repo: Repository<Discount>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Discount);
  }

  async create(discount: Discount): Promise<Discount> {
    return this.repo.save(discount);
  }

  async findAll(): Promise<Discount[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Discount | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, partial: Partial<Discount>): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
