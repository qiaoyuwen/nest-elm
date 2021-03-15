import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 9999;
  await app.listen(port);
  Logger.log(`server started on ${port} port`);
}
bootstrap();
