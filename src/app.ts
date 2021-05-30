import bodyParser from "body-parser";
import config from './config';
import routes from './api';
// @ts-ignore
import express, {NextFunction, Request, Response} from 'express';

function startServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', routes());

    app.use((req: Request, res: Response, next: NextFunction) => {
        const notFound = new Error('Resource not found!');
        notFound['status'] = 404
        next(notFound);
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
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
