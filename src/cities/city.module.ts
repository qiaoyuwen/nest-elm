import { Module } from '@nestjs/common';
import { CitiesController } from './city.controller';
import { CitiesService } from './city.service';
import { DatabaseModule } from '@/db/database.module';
import { cityProviders } from './city.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CitiesController],
  providers: [...cityProviders, CitiesService],
})
export class CitiesModule {}
