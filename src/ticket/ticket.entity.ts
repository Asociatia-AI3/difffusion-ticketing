import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ulid } from 'ulid';
import { User } from '../user/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryColumn()
  id: string = ulid();

  @Column({ unique: true })
  code: string;

  @ManyToOne(() => User, (user) => user.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
