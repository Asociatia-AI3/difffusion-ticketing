import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async create(@Body() data: Partial<Partner>): Promise<Partner> {
    return await this.partnerService.create(data);
  }

  @Get()
  async findAll(): Promise<Partner[]> {
    return await this.partnerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Partner | null> {
    return await this.partnerService.findById(id);
  }
}
