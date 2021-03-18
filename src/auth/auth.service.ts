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
    const user = await this.adminsService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: AdminEntity) {
    return {
      accessToken: this.jwtService.sign({ ...user }),
    };
  }
}
