import { Injectable } from '@nestjs/common';
import { VenueRepository } from './venue.repository';
import { Venue } from './venue.entity';

@Injectable()
export class VenueService {
  constructor(private readonly venueRepo: VenueRepository) {}

  async create(venueData: Partial<Venue>): Promise<Venue> {
    return await this.venueRepo.create(venueData);
  }

  async findAll(): Promise<Venue[]> {
    return await this.venueRepo.findAll();
  }

  async findById(id: string): Promise<Venue | null> {
    return await this.venueRepo.findById(id);
  }
}
