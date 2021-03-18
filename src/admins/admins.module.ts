import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './admins.entity';
import { AdminsService } from './admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity])],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
