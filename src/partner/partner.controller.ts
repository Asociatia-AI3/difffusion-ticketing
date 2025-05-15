import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  create(@Body() data: Partial<Partner>): Promise<Partner> {
    return this.partnerService.create(data);
  }

  @Get()
  findAll(): Promise<Partner[]> {
    return this.partnerService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Partner | null> {
    return this.partnerService.findById(id);
  }
}
