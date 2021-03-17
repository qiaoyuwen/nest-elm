import { Module } from '@nestjs/common';
import { CitiesController } from './city.controller';
import { CitiesService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityEntity } from './city.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityEntity])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
