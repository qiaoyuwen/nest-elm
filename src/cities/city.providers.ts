import type { Connection } from 'typeorm';
import { City } from './city.entity';
import { CITY_REPOSITORY, DATABASE_CONNECTION } from '@/db/constant';

export const cityProviders = [
  {
    provide: CITY_REPOSITORY,
    useFactory: (connection: Connection) => connection.getRepository(City),
    inject: [DATABASE_CONNECTION],
  },
];
