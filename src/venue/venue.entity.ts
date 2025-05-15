import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { Partner } from '../partner/partner.entity';
import { Discount } from '../discount/discount.entity';
import { ulid } from 'ulid';

@Entity('Venues')
export class Venue {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @ManyToOne(() => Partner, (partner) => partner.venues)
  @JoinColumn({ name: 'partner_id' })
  partner: Partner;

  @OneToMany(() => Discount, (discount) => discount.venue)
  discounts: Discount[];

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
