import { AdminsModule } from '@/admins/admins.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants, JwtStrategyName } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AdminsModule,
    PassportModule.register({ defaultStrategy: JwtStrategyName }),
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: `${24 * 60 * 60}s` },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
