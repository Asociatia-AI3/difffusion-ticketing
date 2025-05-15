import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ulid } from 'ulid';
import { Venue } from '../venue/venue.entity';

@Entity('Partners')
export class Partner {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'fiscal_id', unique: true, type: 'varchar', length: 255 })
  fiscalId: string;

  @OneToMany(() => Venue, (venue) => venue.partner)
  venues: Venue[];

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
