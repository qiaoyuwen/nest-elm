import { ShopsModule } from './shops/shops.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitiesModule } from './cities/cities.module';
import { CategoriesModule } from './categories/categories.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { FilesModule } from './files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import DatabaseConfig, { DatabaseConfigNamespace } from './config/database';
import AppConfig from './config/app';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfig, DatabaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get(DatabaseConfigNamespace),
      inject: [ConfigService],
    }),
    CitiesModule,
    CategoriesModule,
    AuthModule,
    AdminsModule,
    FilesModule,
    ShopsModule,
  ],
})
export class AppModule {}
