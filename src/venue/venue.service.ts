import { Injectable } from '@nestjs/common';
import { VenueRepository } from './venue.repository';
import { Venue } from './venue.entity';

@Injectable()
export class VenueService {
  constructor(private readonly venueRepo: VenueRepository) {}

  create(venue: Venue): Promise<Venue> {
    return this.venueRepo.create(venue);
  }

  findAll(): Promise<Venue[]> {
    return this.venueRepo.findAll();
  }

  findById(id: string): Promise<Venue | null> {
    return this.venueRepo.findById(id);
  }

  update(id: string, partial: Partial<Venue>): Promise<void> {
    return this.venueRepo.update(id, partial);
  }

  delete(id: string): Promise<void> {
    return this.venueRepo.delete(id);
  }
}
