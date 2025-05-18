import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  getAll(): Promise<User[]> {
    return this.userRepo.findAll();
  }

  getById(id: string): Promise<User | null> {
    return this.userRepo.findById(id);
  }

  create(userData: Partial<User>): Promise<User> {
    return this.userRepo.createUser(userData);
  }

  delete(id: string): Promise<void> {
    return this.userRepo.deleteUser(id);
  }

  update(id: string, partial: Partial<User>): Promise<void> {
    return this.userRepo.update(id, partial);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }
}
