import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Ticket } from '../ticket/ticket.entity';
import { Discount } from '../discounts/discount.entity';


@Entity('ticketuses')
export class TicketUse {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ticket, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket;

    @ManyToOne(() => Discount, { onDelete: 'CASCADE' })

    @JoinColumn({ name: 'discount_id' })
    discount: Discount;

    @Column({ name: 'created_at', type: 'integer' })
    createdAt: number;

}