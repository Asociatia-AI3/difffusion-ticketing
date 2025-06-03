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
    const filePath = path.join(__dirname, '../../../partners.json');
    let partnersList: Array<{
      partnerId: string;
      name: string;
      fiscalId: string;
      hashedPassword: string;
    }> = [];
    const fileContent = await fs.readFile(filePath, 'utf-8');
    try {
      partnersList = JSON.parse(fileContent) as Array<{
        partnerId: string;
        name: string;
        fiscalId: string;
        hashedPassword: string;
      }>;
      console.log('partners.json successfully read.');
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.warn(`partners.json file not found: ${filePath}`);
        throw new NotFoundException(
          'Authentication failed: Partner data source not found.',
        );
      }
      console.error('Error reading partners.json:', err);
      throw new InternalServerErrorException(
        'Error reading partner data during authentication.',
      );
    }
    const partner = partnersList.find(
      (p) => p.hashedPassword === token && p.partnerId === data.partnerId,
    );
    if (!partner) {
      throw new NotFoundException('Invalid token');
    }
    const getVenue = await this.venueService.findById(data.venueId);
    const discount = await this.discountService.create({
      name: data.name,
      percentOff: data.percentOff,
      maxUses: data.maxUses,
      venue: getVenue!,
    });
    console.log('Discount created:', data);

    if (!discount) {
      throw new NotFoundException('Discount not created');
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
