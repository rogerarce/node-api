import bodyParser from "body-parser";
import config from './config';
import routes from './api';
// @ts-ignore
import express from 'express';

function startServer() {
    const app = express();

    app.use(bodyParser.json());

    app.use('/api', routes());

    app.use((req, res, next) => {
        const notFound = new Error('Resource not found!');
        notFound['status'] = 404
        next(notFound);
    });

    app.use((err, req, res, next) => {
        return res
            .status(err.status)
            .send({ message: err.message })
            .end();
    });

    app.listen(config.PORT, () => {
        console.log(`App listening on port ${config.PORT}`);
    }).on('error', (err: any) => {
        console.error(err);
        process.exit(1);
    });
}

startServer();
