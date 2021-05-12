import { AdminEntity } from '@/admins/admins.entity';
import { AdminsService } from '@/admins/admins.service';
import { ResponseMessage } from '@/http/constant';
import { mockAdminService } from '@/mock/admin';
import { HttpStatus } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtConstants } from '../constants';
import { ProfileResponseDTO } from '../dto/profile.response.dto';
import { JwtStrategy } from '../jwt.strategy';
import { LocalStrategy } from '../local.strategy';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: JwtConstants.secret,
          signOptions: { expiresIn: '60s' },
        }),
      ],
      providers: [
        AuthService,
        AdminsService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: getRepositoryToken(AdminEntity),
          useValue: mockAdminService,
        },
      ],
      controllers: [AuthController],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  describe('login', () => {
    it('should return jwt code', async () => {
      const result = {
        accessToken: '',
      };
      jest.spyOn(authService, 'login').mockImplementation(async () => result);

      expect(
        await authController.login(
          {
            username: '',
            password: '',
          },
          {
            user: {
              success: true,
            },
          },
        ),
      ).toStrictEqual({
        data: result,
        statusCode: HttpStatus.OK,
        message: ResponseMessage.LoginSuccess,
      });
    });
  });

  describe('profile', () => {
    it('should return user profile', async () => {
      const user = new AdminEntity({
        username: 'qiaoyuwen',
      });

      expect(
        authController.getProfile({
          user,
        }),
      ).toStrictEqual(
        new ProfileResponseDTO({
          data: user,
          statusCode: HttpStatus.OK,
          message: ResponseMessage.QuerySuccess,
        }),
      );
    });
  });
});
