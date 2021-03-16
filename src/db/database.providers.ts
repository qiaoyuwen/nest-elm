import type { Connection } from 'typeorm';
import { createConnection, getConnection } from 'typeorm';
import { getMetadataArgsStorage } from 'typeorm';
import { DATABASE_CONNECTION } from './constant';

export const databaseProviders = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      let connection: Connection;
      try {
        connection = getConnection();
      } catch {
        // 忽略
      }
      if (!connection) {
        connection = await createConnection({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: '1234567.',
          database: 'elm',
          entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
          synchronize: true,
        });
      }
      return connection;
    },
  },
];
