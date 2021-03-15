import { NestFactory } from '@nestjs/core';
import type { INestApplication } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

function createDoc(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Nest ELM')
    .setDescription('The Nest ELM API description')
    .setVersion('1.0.0')
    .addTag('cities')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createDoc(app);
  const port = 9999;
  await app.listen(port);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  Logger.log(`server started on ${port} port`);
}
bootstrap();
