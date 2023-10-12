import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/helper/prisma';

@Injectable()
export class UserService {
  async signup(data: User): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }
  getProfile(user: User): User {
    return user;
  }
  login(): string {
    return 'Login successfully';
  }
  logout(req): string {
    req?.session.destroy();
    return 'Your session has been destroyed';
  }
}
