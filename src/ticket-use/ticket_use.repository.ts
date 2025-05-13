import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { TicketUse } from './ticket_use.entity'

@Injectable()
export class TicketUseRepository {
    private readonly repo: Repository<TicketUse>;

    constructor(private readonly dataSource: DataSource) {
        this.repo = dataSource.getRepository(TicketUse);
    }

    create(ticketUseData: Partial<TicketUse>): Promise<TicketUse> {
        const use = this.repo.create(ticketUseData);
        return this.repo.save(use);
    }

    findAll(): Promise<TicketUse[]> {
        return this.repo.find({ relations: ['ticket', 'discount']});
    }
}