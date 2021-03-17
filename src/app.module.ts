import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234567.',
      database: 'elm',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: false,
      extra: {
        // If without this filed emoji can't be stored
        charset: 'utf8mb4_general_ci',
      },
    }),
    CitiesModule,
    CategoriesModule,
  ],
})
export class AppModule {}
