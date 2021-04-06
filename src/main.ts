import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import chalk from 'chalk';
import internalIp from 'internal-ip';
import helmet from 'helmet';
import type { ConfigService } from '@nestjs/config';
import type { AppConfig } from './config/app';
import { ValidationPipe } from '@nestjs/common';

const ipv4 = internalIp.v4.sync();

function createDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest ELM')
    .setDescription('The Nest ELM API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
}

function getAppConfig(app: INestApplication) {
  const configService: ConfigService = app.get('ConfigService');
  const config = configService.get<AppConfig>('app');
  return config;
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.use(helmet());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  const { port, swagger } = getAppConfig(app);

  if (swagger) {
    createDoc(app);
  }

  await app.listen(port, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`
    App running at:
    - Local:   ${chalk.green(`http://localhost:${port}/api/`)}
    - Network: ${chalk.green(`http://${ipv4}:${port}/api/`)}
    `);
    if (swagger) {
      // eslint-disable-next-line no-console
      console.log(`
    Docs running at:
    - Local:   ${chalk.green(`http://localhost:${port}/docs/`)}
    - Network: ${chalk.green(`http://${ipv4}:${port}/docs/`)}
    `);
    }
  });
}
bootstrap();
