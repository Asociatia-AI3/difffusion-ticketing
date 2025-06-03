import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ulid } from 'ulid';
import { User } from '../user/user.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryColumn()
  id: string = ulid();

  @Column({ unique: true })
  code: string;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column({ type: 'decimal', default: 0 })
  discount: number;

  @Column({ nullable: true, type: 'text' })
  qrCode: string;


  @ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
