import 'dotenv/config';
import { ConnectionOptions } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [__dirname + '/../entity/**/*{.ts,.js}'],
  migrations: [__dirname + '/../migration/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/**/*{.ts,.js}'],
  cli: {
    entitiesDir: __dirname + '/../entity',
    migrationsDir: __dirname + '/../migration',
    subscribersDir: __dirname + '/../subscriber',
  },
};

export default ormConfig;
