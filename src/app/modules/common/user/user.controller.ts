import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';
import { LocalUserGuard } from './local.user.guard';
import { AuthenticatedGuard } from 'src/guard/authenticated.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getHello(): string {
    return 'Hello';
  }

  @Post('/signup')
  async signup(@Body() body: User): Promise<User> {
    return await this.userService.signup(body);
  }

  @UseGuards(LocalUserGuard)
  @Post('login')
  login(): string {
    return this.userService.login();
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  getProfile(@Request() req): User {
    return this.userService.getProfile(req.user);
  }

  @Post('/logout')
  logout(@Request() req): string {
    return this.userService.logout(req);
  }
}
