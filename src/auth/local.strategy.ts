import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AdminEntity } from '@/admins/admins.entity';
import { LocalStrategyName, RsaConstants } from './constants';
import NodeRSA from 'node-rsa';
import Crypto from 'crypto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LocalStrategyName) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    username: string,
    password: string,
  ): Promise<{
    success: boolean;
    user?: AdminEntity;
  }> {
    // rsa解密
    const decrypt = new NodeRSA(RsaConstants.privateKey);
    decrypt.setOptions({ encryptionScheme: 'pkcs1' });
    const decryptPassword = decrypt.decrypt(password, 'utf8');

    // hmac加密
    const hmacPassword = Crypto.createHmac('sha1', RsaConstants.privateKey)
      .update(decryptPassword)
      .digest('hex');

    const user = await this.authService.validateUser(username, hmacPassword);
    return {
      success: !!user,
      user,
    };
  }
}
