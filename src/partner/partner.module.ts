import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { PartnerRepository } from './partner.repository';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Partner])],
  providers: [PartnerRepository, PartnerService],
  controllers: [PartnerController],
  exports: [PartnerService],
})
export class PartnerModule {}
