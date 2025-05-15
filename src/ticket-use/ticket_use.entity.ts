import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Ticket } from '../ticket/ticket.entity';
import { Discount } from '../discounts/discount.entity';


@Entity('ticket_uses') 
export class TicketUse {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ticket, {onDelete: 'CASCADE'})
    ticket: Ticket;

    @Column()
    usedAt: Date = new Date();

    @ManyToOne(() => Discount, { onDelete: 'CASCADE' })

    @JoinColumn({ name: 'discount_id' })
    discount: Discount;

    @Column({ name: 'created_at', type: 'integer' })
    createdAt: number;

}