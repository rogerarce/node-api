import * as dotenv from 'dotenv';

const config = dotenv.config();

if (config.error) {
    throw new Error('.env file not found!');
}

export default {
    PORT: process.env.PORT,
    DEV: process.env.DEV,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
};