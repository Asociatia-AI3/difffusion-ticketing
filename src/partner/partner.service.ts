import { Injectable } from '@nestjs/common';
import { PartnerRepository } from './partner.repository';
import { Partner } from './partner.entity';

@Injectable()
export class PartnerService {
  constructor(private readonly partnerRepo: PartnerRepository) {}

  createPartner(partner: Partner): Promise<Partner> {
    return this.partnerRepo.create(partner);
  }

  findAll(): Promise<Partner[]> {
    return this.partnerRepo.findAll();
  }

  findById(id: string): Promise<Partner | null> {
    return this.partnerRepo.findById(id);
  }

  update(id: string, partial: Partial<Partner>): Promise<void> {
    return this.partnerRepo.update(id, partial);
  }

  delete(id: string): Promise<void> {
    return this.partnerRepo.delete(id);
  }
}
