import type { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export const DatabaseConfigNamespace = 'database';

const config: TypeOrmModuleOptions = {
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
};
export default registerAs(DatabaseConfigNamespace, () => config);
