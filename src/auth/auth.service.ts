import { Injectable } from '@nestjs/common';
import { AdminsService } from '@/admins/admins.service';
import type { AdminEntity } from '@/admins/admins.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<AdminEntity | null> {
    let user = await this.adminsService.findOne(username);
    if (!user) {
      // 用户不存在直接注册新用户
      user = await this.register(username, password);
    }
    if (user.password === password) {
      return user;
    }
    return null;
  }

  async register(username: string, password: string) {
    return this.adminsService.save(username, password);
  }

  async login(user: AdminEntity) {
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
