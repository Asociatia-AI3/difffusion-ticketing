import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Venue } from '../venue/venue.entity';
import { TicketUse } from '../ticketuse/ticket-use.entity';
import { ulid } from 'ulid';

@Entity('Discounts')
export class Discount {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'tinyint' })
  percent_off: number;

  @Column({ type: 'tinyint', default: 0 })
  max_uses: number;

  @ManyToOne(() => Venue, (venue) => venue.discounts)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @OneToMany(() => TicketUse, (ticketUse) => ticketUse.discount)
  ticketUses: TicketUse[];

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
