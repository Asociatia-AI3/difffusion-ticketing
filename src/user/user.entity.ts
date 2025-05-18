import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';
import { ulid } from 'ulid';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: string = ulid();

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  mobile: string;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];
}
