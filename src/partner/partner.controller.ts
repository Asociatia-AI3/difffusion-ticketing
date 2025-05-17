import { Controller, Post, Get, Param, Body, Headers } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { partnersPasswords } from 'src/password';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() data: Partial<Partner>): Promise<Partner> {
    return await this.partnerService.create(data);
  }

  @Get()
  async findAll() {
    const partners = await this.partnerService.findAll();
    return { partners: partners };
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Partner | null> {
    return await this.partnerService.findById(id);
  }

  @Post('authenticate')
  async authenticate(
    @Headers('authorization')
    authHeader: string,
    @Body()
    data: {
      partnerId: string;
      password: string;
    },
  ) {
    const token = authHeader.split(' ')[1];
    console.log('Token:', token);
    console.log('Data:', data);
    const partner = await this.partnerService.findById(data.partnerId);
    console.log('Partner:', partner);
    if (!partner) {
      throw new Error('Partner not found');
    }
    if (!partnersPasswords[`${partner.name}`]) {
      throw new Error('Partner not found');
    }
    if (
      partnersPasswords[partner.name as keyof typeof partnersPasswords].employee
        .hasshPassword !== token
    ) {
      throw new Error('Invalid password');
    }

    return { partner: partner };
  }
}
