import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

class MockConfigService {
  get(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567.',
      database: 'elm',
      entities: ['./src/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: false,
      extra: {
        // If without this filed emoji can't be stored
        charset: 'utf8mb4_general_ci',
      },
    };
  }
}

const mockConfigService = new MockConfigService();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue(mockConfigService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/shop-categories (GET)', () => {
    return request(app.getHttpServer()).get('/shop-categories').expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
