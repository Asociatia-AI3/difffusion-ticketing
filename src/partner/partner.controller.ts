import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { encrypt } from '../auth/crypto-utils';
import { validatePartner } from '../auth/partner-credentials';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post('login')
  handleLogin(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const isValid = validatePartner(username, password);

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful', redirectTo: '/partner' };
  }

  @Get('encrypt')
  encrypt(@Query('text') text: string) {
    if (!text) {
      return { error: 'Missing `text` query param' };
    }

    const encrypted = encrypt(text);
    return { result: encrypted };
  }

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
