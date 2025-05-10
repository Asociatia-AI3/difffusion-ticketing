import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import {User} from '../user/user.entity'

@Entity('tickets') 
export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    code: string;

    @Column({default: 5}) 
    maxUses: number;

    @Column({default: 0})
    uses: number;

    @ManyToOne(() => User, user => user.tickets, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: User;
}