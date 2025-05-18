import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { ulid } from 'ulid';
import { Ticket } from '../tickets/ticket.entity';

@Entity('Users')
export class User {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ unique: true, type: 'varchar', length: 20 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 20 })
  mobile: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
