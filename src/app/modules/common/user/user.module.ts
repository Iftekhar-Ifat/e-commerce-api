import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [UserService, LocalStrategy, SessionSerializer],
  controllers: [UserController],
})
export class UserModule {}
