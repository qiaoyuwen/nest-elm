import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AdminEntity } from '@/admins/admins.entity';
import { LocalStrategyName } from './constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalStrategyName) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<AdminEntity> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
