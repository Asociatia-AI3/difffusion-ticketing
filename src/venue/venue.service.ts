import { Injectable } from '@nestjs/common';
import { VenueRepository } from './venue.repository';
import { Venue } from './venue.entity';

@Injectable()
export class VenueService {
  constructor(private readonly venueRepo: VenueRepository) {}

  create(venueData: Partial<Venue>): Promise<Venue> {
    return this.venueRepo.create(venueData);
  }

  findAll(): Promise<Venue[]> {
    return this.venueRepo.findAll();
  }

  findById(id: string): Promise<Venue | null> {
    return this.venueRepo.findById(id);
  }
}
