import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { User } from '../user/user.entity';
import { TicketUse } from '../ticketuse/ticket-use.entity';
import { ulid } from 'ulid';

@Entity('Tickets')
export class Ticket {
  @PrimaryColumn({ type: 'varchar', length: 255 })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  code: string;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => TicketUse, (ticketUse) => ticketUse.ticket)
  ticketUses: TicketUse[];

  @BeforeInsert()
  generateId() {
    this.id = ulid();
  }
}
