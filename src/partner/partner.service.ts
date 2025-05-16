import { Injectable } from '@nestjs/common';
import { PartnerRepository } from './partner.repository';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerService {
  getAll(): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly partnerRepo: PartnerRepository) {}

  create(data: Partial<Partner>): Promise<Partner> {
    return this.partnerRepo.create(data);
  }

  findAll(): Promise<Partner[]> {
    return this.partnerRepo.findAll();
  }

  findById(id: string): Promise<Partner | null> {
    return this.partnerRepo.findById(id);
  }
}
