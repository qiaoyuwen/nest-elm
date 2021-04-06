import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtStrategyName, JwtConstants } from './constants';
import { AdminEntity } from '@/admins/admins.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JwtStrategyName) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
  }
  async validate(user: AdminEntity) {
    return new AdminEntity({
      ...user,
    });
  }
}
