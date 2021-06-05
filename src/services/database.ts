import { Sequelize } from "sequelize";
import config from '../config';

const {
    DATABASE_PORT,
    DATABASE_PASSWORD,
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_HOST
} = config;

const database: Sequelize = new Sequelize(
    `postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
);

export default database