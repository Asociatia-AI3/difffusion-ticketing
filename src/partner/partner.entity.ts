import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { ulid } from 'ulid';
import { Venue } from '../venue/venue.entity';

@Entity('partners')
export class Partner {
  @PrimaryColumn()
  id: string = ulid();

  @Column()
  name: string;

  @Column({ name: 'fiscal_id' })
  fiscalId: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Venue, (venue) => venue.partner)
  venues: Venue[];
}
