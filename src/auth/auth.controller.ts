import type { AdminEntity } from './../admins/admins.entity';
import { Controller, Request, Post, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ResponseMessage } from '@/http/constant';
import type { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: { user: AdminEntity }): Promise<LoginDTO> {
    const data = await this.authService.login(req.user);
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.LoginSuccess,
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: AdminEntity }) {
    return req.user;
  }
}
