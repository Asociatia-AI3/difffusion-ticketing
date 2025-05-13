import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { Venue } from '../venue/venue.entity'; // asigură-te că ai creat-o sau o creezi ulterior

@Entity('discounts')
export class Discount {
  @PrimaryColumn()
  id: string = ulid();

  @Column()
  name: string;

  @Column({ name: 'percent_off', type: 'int' })
  percentOff: number;

  @Column({ name: 'max_uses', type: 'int', default: 0 })
  maxUses: number;

  @ManyToOne(() => Venue, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;
}
