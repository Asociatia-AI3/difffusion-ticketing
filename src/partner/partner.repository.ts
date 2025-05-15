import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerRepository {
  private readonly repo: Repository<Partner>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Partner);
  }

  async create(partner: Partner): Promise<Partner> {
    return this.repo.save(partner);
  }

  async findAll(): Promise<Partner[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Partner | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, partial: Partial<Partner>): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
