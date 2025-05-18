import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { Venue } from './venue.entity';

@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  //Create
  @Post()
  create(@Body() venue: Venue): Promise<Venue> {
    return this.venueService.create(venue);
  }

  //Read-All
  @Get()
  getAll(): Promise<Venue[]> {
    return this.venueService.findAll();
  }

  //Read-One
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Venue | null> {
    return this.venueService.findById(id);
  }

  //Update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Venue>,
  ): Promise<void> {
    return this.venueService.update(id, update);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.venueService.delete(id);
  }
}
