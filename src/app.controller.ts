import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { TicketService } from './ticket/ticket.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly ticketService: TicketService,
  ) {}

  @Get()
  @Render('index')
  getIndex() {
    return { title: 'Home', message: 'Welcome to the Home Page' };
  }

  @Get('/user-entry')
  @Render('user-entry')
  getUserTicketForm() {
    return { title: 'User Ticket Form', message: 'Fill in your details' };
  }

  @Get('/user-registry')
  @Render('user-registry')
  getUserRegistry() {
    return { title: 'User Registry', message: 'Register your details' };
  }

  @Get('/partner-login')
  @Render('partner-login')
  getPartnerLogin() {
    return { title: 'Partner Login', message: 'Login to your account' };
  }

  @Get('/qr-scan-page')
  @Render('qr-scan-page')
  getQrScanPage() {
    return {
      title: 'QR Scan Page',
      message: 'Scan the QR code',
    };
  }

  @Get('/admin-setup')
  @Render('admin-setup')
  getAdminSetup() {
    return {
      title: 'Admin Setup',
      message: 'Setup your admin account',
    };
  }
  @Get('/admin-login')
  @Render('admin-login')
  getAdminLogin() {
    return {
      title: 'Admin Setup',
      message: 'Setup your admin account',
    };
  }
}
