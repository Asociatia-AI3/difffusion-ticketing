import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Ticket } from '../ticket/ticket.entity';
import { Discount } from '../discounts/discount.entity';


@Entity('ticketuses') 
export class TicketUse {
    @PrimaryGeneratedColumn()
    id: number;


    @Column({ name: 'ticket_id', type: 'varchar', length: 255 })
    ticketId: string;

    @ManyToOne(() => Ticket, { onDelete: 'CASCADE' })
    
    @JoinColumn({ name: 'ticket_id' })
    ticket: Ticket;

    @Column({ type: 'datetime', name: 'usedAt' })
    usedAt: Date;

    @Column({ name: 'discount_id', type: 'varchar', length: 255 })
    discountId: string;

    @ManyToOne(() => Discount, { onDelete: 'CASCADE' })

    @JoinColumn({ name: 'discount_id' })
    discount: Discount;

    @Column({ name: 'created_at', type: 'int' })
    createdAt: number

}