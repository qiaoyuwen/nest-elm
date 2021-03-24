import type { AdminEntity } from './../admins/admins.entity';
import { Controller, Request, Post, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ResponseMessage } from '@/http/constant';
import type { LoginDTO } from './dto/login.dto';
import { ProfileDTO } from './dto/profile.dto';
import type { AdminProfileEntity } from '@/admins/admins-profile.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request()
    req: {
      user: {
        success: boolean;
        user?: AdminEntity;
      };
    },
  ): Promise<LoginDTO> {
    const userData = req.user;
    if (userData.success) {
      const data = await this.authService.login(userData.user);
      return {
        statusCode: HttpStatus.OK,
        message: ResponseMessage.LoginSuccess,
        data,
      };
    }
    return {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: ResponseMessage.LoginFailed,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: AdminProfileEntity }): ProfileDTO {
    return {
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: {
        user: req.user,
      },
    };
  }
}
