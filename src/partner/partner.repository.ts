import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerRepository {
  private readonly repo: Repository<Partner>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Partner);
  }

  create(data: Partial<Partner>): Promise<Partner> {
    const partner = this.repo.create(data);
    return this.repo.save(partner);
  }

  findAll(): Promise<Partner[]> {
    return this.repo.find({ relations: ['venues'] });
  }

  findById(id: string): Promise<Partner | null> {
    return this.repo.findOne({ where: { id }, relations: ['venues'] });
  }
}
