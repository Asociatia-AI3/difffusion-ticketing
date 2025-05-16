import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ulid } from 'ulid';
import { Partner } from '../partner/partner.entity';

@Entity('venues')
export class Venue {
  @PrimaryColumn()
  id: string = ulid();

  @Column()
  name: string;

  @ManyToOne(() => Partner, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;
}
