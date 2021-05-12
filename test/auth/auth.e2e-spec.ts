import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import { LocalStrategy } from '@/auth/local.strategy';
import { JwtStrategy } from '@/auth/jwt.strategy';
import { AdminsService } from '@/admins/admins.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AdminEntity } from '@/admins/admins.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants, RsaConstants } from '@/auth/constants';
import NodeRSA from 'node-rsa';
import { ResponseMessage } from '@/http/constant';
import { mockAdminService } from '@/mock/admin';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/profile (GET) first call should get 401 Unauthorized', () => {
    return request(app.getHttpServer()).get('/auth/profile').expect(401);
  });

  it('should get a JWT then successfully make a call', async () => {
    const encrypt = new NodeRSA(RsaConstants.publicKey);
    encrypt.setOptions({ encryptionScheme: 'pkcs1' });

    const loginRes = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'qiaoyuwen', password: encrypt.encrypt('123456', 'base64') })
      .expect(201);

    const token = loginRes.body.data.accessToken;
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({
        statusCode: HttpStatus.OK,
        message: ResponseMessage.QuerySuccess,
        data: {
          username: 'qiaoyuwen',
        },
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
