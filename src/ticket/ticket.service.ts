import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as QRCode from 'qrcode';
import { Ticket } from './interfaces/ticket.interface';

@Injectable()
export class TicketService {
  private tickets: Ticket[] = [];
  private readonly DEFAULT_MAX_USES = 5;

  async generateTicket(): Promise<Ticket> {
    const ticketCode = `TKT-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    const qrCodeDataUrl = await new Promise<string>((resolve, reject) => {
      QRCode.toDataURL(ticketCode, { errorCorrectionLevel: 'H' }, (err, url) => {
        if (err) reject(err);
        else resolve(url);
      });
    });

    const newTicket: Ticket = {
      id: uuidv4(),
      code: ticketCode,
      createdAt: new Date(),
      maxUses: this.DEFAULT_MAX_USES,
      uses: 0,
      valid: true,
      qrCode: qrCodeDataUrl
    };
    
    this.tickets.push(newTicket);
    return newTicket;
  }

  validateTicket(ticketCode: string): { valid: boolean; remainingUses: number } {
    const ticket = this.tickets.find(t => t.code === ticketCode && t.valid);
    if (!ticket) return { valid: false, remainingUses: 0 };
    return { valid: true, remainingUses: ticket.maxUses - ticket.uses };
  }

  useDiscount(ticketCode: string): { success: boolean; remainingUses?: number } {
    const ticket = this.tickets.find(t => t.code === ticketCode && t.valid);
    if (!ticket || ticket.uses >= ticket.maxUses) {
      return { success: false };
    }
    ticket.uses++;
    return { success: true, remainingUses: ticket.maxUses - ticket.uses };
  }
}