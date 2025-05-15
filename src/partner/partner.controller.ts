import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  //Create
  @Post()
  create(@Body() partnerData: Partner): Promise<Partner> {
    return this.partnerService.createPartner(partnerData);
  }

  //Read-All
  @Get()
  getAll(): Promise<Partner[]> {
    return this.partnerService.findAll();
  }

  //Read-One
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Partner | null> {
    return this.partnerService.findById(id);
  }

  //Update
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Partner>,
  ): Promise<void> {
    return this.partnerService.update(id, update);
  }

  //Delete
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.partnerService.delete(id);
  }
}
