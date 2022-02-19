const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
  ENVIRONMENT,
} = process.env;

// Note that this config is only used by typeorm cli migration execution. The API config is in
// src/modules/app/constants/dbconfigs

module.exports = {
  type: 'postgres',
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  synchronize: false,
  logging: ENVIRONMENT === 'local',
  entities: ['src/models/*.ts'],
  migrations: ['migrations/*.ts'],
  cli: {
    migrationsDir: 'migrations',
  },
};
