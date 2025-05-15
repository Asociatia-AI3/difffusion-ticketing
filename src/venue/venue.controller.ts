import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { VenueService } from './venue.service';
import { Venue } from './venue.entity';

@Controller('venues')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @Post()
  create(@Body() venueData: Partial<Venue>): Promise<Venue> {
    return this.venueService.create(venueData);
  }

  @Get()
  findAll(): Promise<Venue[]> {
    return this.venueService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Venue | null> {
    return this.venueService.findById(id);
  }
}
