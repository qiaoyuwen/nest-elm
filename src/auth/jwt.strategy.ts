import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import type { AdminEntity } from '@/admins/admins.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: AdminEntity) {
    const payload = {
      id: user.id,
      username: user.username,
      createTime: user.createTime,
      status: user.status,
      avatar: user.avatar,
    };
    return payload;
  }
}
