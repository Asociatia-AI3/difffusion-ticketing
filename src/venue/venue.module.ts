import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venue } from './venue.entity';
import { VenueService } from './venue.service';
import { VenueRepository } from './venue.repository';
import { VenueController } from './venue.controller';
import { PartnerModule } from 'src/partner/partner.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venue]), PartnerModule],
  providers: [VenueService, VenueRepository],
  controllers: [VenueController],
  exports: [VenueService],
})
export class VenueModule {}
