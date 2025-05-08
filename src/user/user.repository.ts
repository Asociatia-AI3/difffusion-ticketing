import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private readonly repo: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.repo = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repo.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.repo.create(userData);
    return this.repo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
