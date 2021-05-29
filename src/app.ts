import config from './config';
import routes from './api';
// @ts-ignore
import express from 'express';

function startServer() {
    const app = express();

    app.use('/api', routes());

    app.listen(config.PORT, () => {
        console.log(`App listening on port ${config.PORT}`);
    }).on('error', (err: any) => {
        console.error(err);
        process.exit(1);
    });
}

startServer();
