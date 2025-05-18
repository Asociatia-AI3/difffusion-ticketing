import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { PartnerService } from './partner.service';
import { PartnerRepository } from './partner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnerService, PartnerRepository],
  exports: [PartnerService],
})
export class PartnerModule {}
