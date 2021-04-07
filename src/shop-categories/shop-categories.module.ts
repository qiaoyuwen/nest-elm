import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCategoriesService } from './shop-categories.service';
import { ShopCategoriesController } from './shop-categories.controller';
import { ShopCategoryEntity } from './shop-categories.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShopCategoryEntity])],
  controllers: [ShopCategoriesController],
  providers: [ShopCategoriesService],
})
export class ShopCategoriesModule {}
