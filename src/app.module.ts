import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/city.module';

@Module({
  imports: [CitiesModule],
})
export class AppModule {}
