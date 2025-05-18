// src/config/orm.config.ts
import { DataSourceOptions } from 'typeorm';
import { User } from '../user/user.entity';
import { Partner } from '../partner/partner.entity';
import { Venue } from '../venue/venue.entity';
import { Ticket } from '../ticket/ticket.entity';
import { TicketUse } from '../ticket-use/ticket_use.entity';
import { Discount } from '../discounts/discount.entity';
import { join } from 'path';

const root = process.cwd();

export const ormConfig: DataSourceOptions = {
  type: 'sqlite',
  database:   join(root, 'ticketing.sqlite'),
  entities: [User, Partner, Venue, Ticket, TicketUse, Discount],
  migrations: [join(root, 'migrations/*.ts')],
  synchronize: false,
};
