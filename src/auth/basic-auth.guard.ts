import {
    Injectable, 
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { partnerCredentials } from './partner-credentials'; 
import * as bcrypt from "bcrypt";


@Injectable()
export class BasicAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const authHeader = req.headers['authorization'];

        if(!authHeader || !authHeader.startsWith('Basic ')) {
            throw new UnauthorizedException("Authorization header missing");
        }

        const base64 = authHeader.split(' ')[1];
        const [username, password] = Buffer.from(base64, 'base64').toString().split(':');

        const partner = partnerCredentials.find(p => p.username === username);
        if(!partner || !(await bcrypt.compare(password, partner.passwordHash))) {
            throw new UnauthorizedException('Invalid username or password');
        }

        return true;
    }
}