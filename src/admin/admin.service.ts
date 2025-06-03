import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Ticket } from '../ticket/ticket.entity';
import * as QRCode from 'qrcode';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Ticket)
    private readonly ticketRepo: Repository<Ticket>,
  ) {}

  
  // --- USERS ---
  async findAllUsers(): Promise<User[]> {
    return this.userRepo.find();
  }

 async createUser(name: string, email: string, mobile: string): Promise<User> {
  const user = this.userRepo.create({ name, email, mobile });
  return this.userRepo.save(user);
}


  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async updateUser(id: number, name: string, email: string): Promise<void> {
    await this.userRepo.update(id, { name, email });
  }

  // --- TICKETS ---
async findAllTickets(): Promise<Ticket[]> {
  return this.ticketRepo.find({ relations: ['user'] });
}


  /*async createTicket(title: string, price: number, userId: number): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const ticket = this.ticketRepo.create({ title, price, user });
  return this.ticketRepo.save(ticket);
}*//*
async createTicket(title: string, price: number, userId: number): Promise<Ticket> {
  console.log('DEBUG → ticket creation input:', { title, price, userId });

  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) {
    console.error('User not found! ID:', userId);
    throw new Error('User not found');
  }

  const code = `TCK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const ticket = this.ticketRepo.create({ title, price, code, user });

  return this.ticketRepo.save(ticket);
}
*/
/*
async createTicket(title: string, price: number, discount: number, userId: number): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const ticket = this.ticketRepo.create({ title, price, discount, user });
  return this.ticketRepo.save(ticket);
}*/

/*async createTicket(title: string, price: number, discount: number, userId: number): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const ticket = this.ticketRepo.create({
    title,
    price,
    discount,
    user
  });

  return this.ticketRepo.save(ticket);
}*/

/*async createTicket(title: string, price: number, discount: number, userId: number): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const ticket = this.ticketRepo.create({
    title,
    price,
    discount,
    user
  });

  return this.ticketRepo.save(ticket);
}*/
/*
async createTicket(title: string, price: number, discount: number, userId: number): Promise<Ticket> {
  console.log('CREATE SERVICE INPUTS:', title, price, discount, userId); // log 3

  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) {
    console.error('USER NOT FOUND:', userId); // log 4
    throw new Error('User not found');
  }

  const ticket = this.ticketRepo.create({
    title,
    price,
    discount,
    user
  });

  console.log('CREATED TICKET OBJECT:', ticket); // log 5

  return this.ticketRepo.save(ticket);
}

*//*
async createTicket(title: string, price: number, discount: number, userId: number): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const code = 'TCK-' + Math.random().toString(36).substring(2, 8).toUpperCase(); // <-- bunu ekle

  const ticket = this.ticketRepo.create({
    title,
    price,
    discount,
    code,  // <-- artık tanımlı
    user,
  });

  return this.ticketRepo.save(ticket);
}*/
/*
async createTicket(
  title: string,
  price: number,
  discount: number,
  userId: number
): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const code = 'TCK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const qrCode = await QRCode.toDataURL(code); // <-- QR kod base64

  const ticket = this.ticketRepo.create({
    title,
    price,
    discount,
    code,
    qrCode, // <-- QR kodu da ticket'a ekle
    user,
  });

  return this.ticketRepo.save(ticket);
}




*/
async createTicket(
  title: string,
  price: number,
  discount: number,
  userId: number
): Promise<Ticket> {
  const user = await this.userRepo.findOneBy({ id: userId });
  if (!user) throw new Error('User not found');

  const code = 'TCK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const qrCode = await QRCode.toDataURL(code);

  const ticket = this.ticketRepo.create({
    id: undefined, // çünkü `ulid()` otomatik atanıyor
    title,
    price,
    discount,
    code,
    qrCode,
    user,
  });

  return this.ticketRepo.save(ticket);
}




  async deleteTicket(id: number): Promise<void> {
    await this.ticketRepo.delete(id);
  }

  /*async updateTicket(id: number, title: string, price: number): Promise<void> {
    await this.ticketRepo.update(id, { title, price });
  }*/
 async updateTicket(id: string, title: string, price: number, discount: number): Promise<void> {
  await this.ticketRepo.update(id, { title, price, discount });
}





}



