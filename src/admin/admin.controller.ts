import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Render,
  Redirect,
} from '@nestjs/common';
import { BasicAuthGuard } from '../common/guards/auth.guard';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(BasicAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  getAdminPanel(): string {
    return `
      <html>
        <head><title>Admin Panel</title></head>
        <body>
          <h1>Welcome to the Admin Panel</h1>
          <ul>
            <li><a href="/admin/users">Manage Users</a></li>
            <li><a href="/admin/tickets">Manage Tickets</a></li>
          </ul>
        </body>
      </html>
    `;
  }

  // --- USERS ---
  @Get('users')
  @Render('admin/users')
  async getUsers() {
    const users = await this.adminService.findAllUsers();
    return { users };
  }

  @Post('users/create')
@Redirect('/admin/users')
async createUser(@Body() body: { name: string; email: string; mobile: string }) {
  await this.adminService.createUser(body.name, body.email, body.mobile);
}


  @Post('users/delete')
  @Redirect('/admin/users')
  async deleteUser(@Body('id') id: number) {
    await this.adminService.deleteUser(id);
  }

  @Post('users/update')
  @Redirect('/admin/users')
  async updateUser(@Body() body: { id: number; name: string; email: string }) {
    await this.adminService.updateUser(body.id, body.name, body.email);
  }

  // --- TICKETS ---
@Get('tickets')
@Render('admin/tickets')
async getTickets() {
  const tickets = await this.adminService.findAllTickets();
  const users = await this.adminService.findAllUsers(); //  kullanıcıları da getiriyoruz
  return { tickets, users };
}

/*
@Post('tickets/create')
@Redirect('/admin/tickets')
async createTicket(
  @Body() body: { title: string; price: string; userId: string }
) {
  const title = body.title;
  const price = parseFloat(body.price);
  const userId = parseInt(body.userId);

  if (isNaN(price) || isNaN(userId)) {
    throw new Error('Price or userId is not a valid number');
  }

  await this.adminService.createTicket(title, price, userId);
}
*//*
@Post('tickets/create')
@Redirect('/admin/tickets')
async createTicket(@Body() body: { title: string; price: number; discount: number; userId: number }) {
  await this.adminService.createTicket(
    body.title,
    Number(body.price),
    Number(body.discount),
    Number(body.userId)
  );
}

*/
@Post('tickets/create')
@Redirect('/admin/tickets')
async createTicket(@Body() body: { title: string; price: number; discount: number; userId: number }) {
  console.log('TICKET CREATE BODY:', body); // log 1

  try {
    await this.adminService.createTicket(
      body.title,
      Number(body.price),
      Number(body.discount),
      Number(body.userId)
    );
  } catch (err) {
    console.error('TICKET CREATE ERROR:', err); // log 2
    throw err;
  }
}





  @Post('tickets/delete')
  @Redirect('/admin/tickets')
  async deleteTicket(@Body('id') id: number) {
    await this.adminService.deleteTicket(id);
  }

  /*@Post('tickets/update')
  @Redirect('/admin/tickets')
  async updateTicket(
    @Body() body: { id: number; title: string; price: number },
  ) {
    await this.adminService.updateTicket(
      body.id,
      body.title,
      Number(body.price),
    );
  }*/
 @Post('tickets/update')
@Redirect('/admin/tickets')
async updateTicket(
  @Body() body: { id: string; title: string; price: number; discount: number },
) {
  await this.adminService.updateTicket(
    body.id,
    body.title,
    Number(body.price),
    Number(body.discount)
  );
}

}
