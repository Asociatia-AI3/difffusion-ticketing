import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { VenueService } from './venue.service';
import { VenueRepository } from './venue.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Venue])],
  providers: [VenueService, VenueRepository],
  exports: [VenueService],
})
export class VenueModule {}
