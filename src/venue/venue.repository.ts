import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Venue } from './venue.entity';

@Injectable()
export class VenueRepository {
  private readonly repo: Repository<Venue>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(Venue);
  }

  async create(venue: Venue): Promise<Venue> {
    return this.repo.save(this.repo.create(venue));
  }

  async findAll(): Promise<Venue[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<Venue | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, partial: Partial<Venue>): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
