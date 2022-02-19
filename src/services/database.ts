import { createConnection } from 'typeorm';
import config from '../config';
import { User } from '../models/users';
import { Todos } from '../models/todos';

const connection = () => {
    return createConnection({
        type: 'postgres',
        host: config.DATABASE_HOST,
        port: Number(config.DATABASE_PORT),
        username: config.DATABASE_USER,
        password: config.DATABASE_PASSWORD,
        database: config.DATABASE_NAME,
        entities: [User, Todos],
        synchronize: false,
        logging: config.ENVIRONMENT === 'local',
    });
}

export default connection;