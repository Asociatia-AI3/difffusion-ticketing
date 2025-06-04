import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Headers,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { promises as fs } from 'fs';
import * as path from 'path';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(
    @Body()
    data: {
      name: string;
      fiscalId: string;
      username: string;
      password: string;
    },
  ) {
    console.log('Creating partner with data:', data);
    const filePath = path.join(__dirname, '../../../partners.json');
    console.log(`Path to partners.json: ${filePath}`);

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
      console.log('Existing partners.json file read successfully.');
    } catch (err) {
      if (err.code === 'ENOENT') {
        console.log('partners.json not found, a new one will be created.');
      } else {
        console.error('Error reading partners.json:', err);
        throw new InternalServerErrorException(
          'An error occurred while reading partner data.',
        );
      }
    }

    const hashedPassword = btoa(data.username + ':' + data.password);

    const _ = await this.partnerService.create({
      name: data.name,
      fiscalId: data.fiscalId,
    });

    partnersList.push({
      partnerId: _.id,
      name: data.name,
      fiscalId: data.fiscalId,
      hashedPassword: hashedPassword,
    });

    console.log(
      `Partner list to be written: ${JSON.stringify(partnersList, null, 2)}`,
    );

    try {
      await fs.writeFile(
        filePath,
        JSON.stringify(partnersList, null, 2),
        'utf-8',
      );
      console.log('Successfully written to partners.json.');
    } catch (writeErr) {
      console.error('Error writing to partners.json:', writeErr);
      throw new InternalServerErrorException(
        'An error occurred while saving partner data.',
      );
    }

    return {
      success: true,
      message: 'Partner created successfully',
    };
  }

  @Get()
  async findAll() {
    const partners = await this.partnerService.findAll();
    console.log('Partners:', partners);
    return { partners: partners };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Partner | null> {
    return await this.partnerService.findById(id);
  }

  @Post('authenticate')
  async authenticate(
    @Body()
    data: {
      username: string;
      password: string;
    },
  ) {
    const envUsername = process.env.PARTNER_USERNAME;
    const envPassword = process.env.PARTNER_PASSWORD;
    if (!envUsername || !envPassword) {
      throw new InternalServerErrorException(
        'Environment variables for partner authentication are not set.',
      );
    }
   if (envUsername !== data.username || envPassword !== data.password) {
      throw new NotFoundException('Invalid credentials');
    }

    const token = btoa(data.username + ':' + data.password);
    localStorage.setItem('token', token);
    return { token: token };
  }
}
