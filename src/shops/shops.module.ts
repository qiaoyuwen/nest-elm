import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopEntity } from './shops.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopEntity])],
  controllers: [ShopsController],
  providers: [ShopsService],
})
export class ShopsModule {}
