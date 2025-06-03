import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Venue } from './venue.entity';

@Injectable()
export class VenueRepository {
  private readonly repo: Repository<Venue>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Venue);
  }

  create(venueData: Partial<Venue>): Promise<Venue> {
    const venue = this.repo.create(venueData);
    return this.repo.save(venue);
  }

  findAll(): Promise<Venue[]> {
    return this.repo.find({ relations: ['partner'] });
  }

  async findById(id: string): Promise<Venue | null> {
    return await this.repo.findOne({
      where: { id },
      relations: ['partner'],
    });
  }
}
