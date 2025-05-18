import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Ticket } from '../tickets/ticket.entity';
import { Discount } from '../discount/discount.entity';
import { ulid } from 'ulid';

@Entity('TicketUses')
export class TicketUse {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @ManyToOne(() => Ticket, (ticket) => ticket.ticketUses)
  @JoinColumn({ name: 'ticket_id' })
  ticket: Ticket;

  @ManyToOne(() => Discount, (discount) => discount.ticketUses)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @Column({ type: 'int', name: 'created_at' })
  createdAt: number;

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
