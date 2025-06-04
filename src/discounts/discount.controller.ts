import {
  Body,
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { DiscountService } from './discount.service';
import { VenueService } from 'src/venue/venue.service';
import * as path from 'path';
import { promises as fs } from 'fs';

@Controller('discounts')
export class DiscountController {
  constructor(
    private readonly discountService: DiscountService,
    private readonly venueService: VenueService,
  ) {}

  @Get()
  async findAll() {
    return await this.discountService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.discountService.findById(id);
  }

  @Post()
  async create(
    @Headers('authorization') authHeader: string,
    @Body()
    data: {
      name: string;
      percentOff: number;
      maxUses: number;
      partnerId: string;
      venueId: string;
    },
  ) {
    console.log('Creating discount with data:', data);
    const token = authHeader.split(' ')[1];
    const userNamePlusPassword = atob(token);
    const userName = userNamePlusPassword.split(':')[0];
    const password = userNamePlusPassword.split(':')[1];
    const envUsername = process.env.PARTNER_USERNAME;
    const envPassword = process.env.PARTNER_PASSWORD;
    if (!envUsername || !envPassword) {
      throw new InternalServerErrorException(
        'Environment variables for partner authentication are not set.',
      );
    }
    if (envUsername !== userName || envPassword !== password) {
      throw new NotFoundException('Invalid credentials');
    }
    
   
    return {
      success: true,
      discount: discount,
    };
  }

  @Get('/venue/:id')
  async findByVenueId(@Param('id') id: string) {
    console.log('Finding discounts for venue with ID:', id);
    const data = await this.discountService.findByVenueId(id);
    console.log('id', id);
    console.log('data', data);
    return {
      discounts: data,
    };
  }
}
