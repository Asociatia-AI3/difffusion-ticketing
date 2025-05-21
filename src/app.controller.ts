import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHome() {
    return { 
      title: 'Diffusion Ticketing',
      features: [
        {
          icon: '🎟️',
          title: 'Free Ticket Generation',
          description: 'Create unlimited tickets without authentication'
        },
        {
          icon: '💰',
          title: 'Discount Management',
          description: 'Each ticket provides up to 5 partner discounts'
        },
        {
          icon: '🔐',
          title: 'Partner Validation',
          description: 'Secure BasicAuth for partner verification'
        },
        {
          icon: '📱',
          title: 'QR Code Scanning',
          description: 'Quick validation through QR codes'
        }
      ],
      partners: ['Venue A', 'Venue B', 'Venue C', 'Venue D']
    };
  }
}