import * as dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
    throw new Error('.env file not found!');
}

export default {
    PORT: process.env.PORT,
    DEV: process.env.DEV,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    ENVIRONMENT: process.env.ENVIRONMENT,
};