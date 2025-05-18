import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Headers,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { Venue } from './venue.entity';
import { promises as fs } from 'fs';
import * as path from 'path';
import { PartnerService } from 'src/partner/partner.service';

@Controller('venues')
export class VenueController {
  constructor(
    private readonly venueService: VenueService,
    private readonly partnerService: PartnerService,
  ) {}

  @Post()
  async create(
    @Headers('authorization')
    authHeader: string,
    @Body()
    venueData: {
      partNerName: string;
      venueName: string;
      partnerId: string;
    },
  ) {
    console.log('Creating venue with data:', venueData);
    const token = authHeader.split(' ')[1];
    const filePath = path.join(__dirname, '../../../partners.json');
    let partnersList: Array<{
      partnerId: string;
      name: string;
      fiscalId: string;
      hashedPassword: string;
    }> = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf-8');
      partnersList = JSON.parse(fileContent) as Array<{
        partnerId: string;
        name: string;
        fiscalId: string;
        hashedPassword: string;
      }>;
      console.log('partners.json read successfully.');
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
    const _ = partnersList.find(
      (p) => p.hashedPassword === token && p.partnerId === venueData.partnerId,
    );
    if (!_) {
      throw new NotFoundException('Invalid token');
    }

    const getPartner = await this.partnerService.findById(venueData.partnerId);

    const data = await this.venueService.create({
      name: venueData.venueName,
      partner: getPartner!,
    });

    if (!data) {
      throw new NotFoundException('Venue not created');
    }
    console.log('Venue created:', data);
    return {
      success: true,
      message: 'Venue created successfully',
    };
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
