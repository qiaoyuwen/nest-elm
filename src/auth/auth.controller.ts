import { LoginRequestDTO } from './dto/login.request.dto';
import type { AdminEntity } from './../admins/admins.entity';
import { Controller, Request, Post, UseGuards, Get, HttpStatus, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { ResponseMessage } from '@/http/constant';
import type { LoginResponseDTO } from './dto/login.response.dto';
import { ProfileResponseDTO } from './dto/profile.response.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ControllerName } from './constants';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerName)
@Controller(ControllerName)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDTO,
    @Request()
    req: {
      user: {
        success: boolean;
        user?: AdminEntity;
      };
    },
  ): Promise<LoginResponseDTO> {
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
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  @ApiBearerAuth()
  getProfile(@Request() req: { user: AdminEntity }): ProfileResponseDTO {
    return new ProfileResponseDTO({
      statusCode: HttpStatus.OK,
      message: ResponseMessage.QuerySuccess,
      data: req.user,
    });
  }
}
