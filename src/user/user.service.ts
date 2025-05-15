import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { TicketService} from '../ticket/ticket.service'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly ticketService: TicketService
  ) {}

  getAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  getById(id: number): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  create(userData: Partial<User>): Promise<User> {
    return this.userRepo.createUser(userData);
  }

  delete(id: number): Promise<void> {
    return this.userRepo.deleteUser(id);
  }
}
