import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import chalk from 'chalk';
import internalIp from 'internal-ip';

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

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  createDoc(app);
  const port = 9999;
  await app.listen(port, '0.0.0.0', () => {
    // eslint-disable-next-line no-console
    console.log(`
    App running at:
    - Local:   ${chalk.green(`http://localhost:${port}/api/`)}
    - Network: ${chalk.green(`http://${ipv4}:${port}/api/`)}
    Docs running at:
    - Local:   ${chalk.green(`http://localhost:${port}/docs/`)}
    - Network: ${chalk.green(`http://${ipv4}:${port}/docs/`)}
    `);
  });
}
bootstrap();
