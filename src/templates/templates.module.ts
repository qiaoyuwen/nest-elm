import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TemplateEntity } from './templates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TemplateEntity])],
  controllers: [TemplatesController],
  providers: [TemplatesService],
})
export class TemplatesModule {}
