import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Controller('login')
export class LoginController {
  @Get()
  getLoginPage() {
    return `
      <html>
        <head>
          <title>Admin Login</title>
        </head>
        <body>
          <h2>Admin Login</h2>
          <form method="POST" action="/login">
            <input type="text" name="username" placeholder="Username" required /><br />
            <input type="password" name="password" placeholder="Password" required /><br />
            <button type="submit">Login</button>
          </form>
        </body>
      </html>
    `;
  }

  @Post()
  login(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    const validUser = process.env.ADMIN_USERNAME;
    const validPass = process.env.ADMIN_PASSWORD;

    if (username === validUser && password === validPass) {
      const authString = Buffer.from(`${username}:${password}`).toString('base64');
      res.cookie('auth', authString, { httpOnly: true });
      return res.redirect('/admin');
    }

    return res.status(401).send('<h3>Invalid credentials</h3><a href="/login">Try again</a>');
  }
}
