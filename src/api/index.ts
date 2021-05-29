import {Router} from "express";
import user from "./routes/user";
import guest from './routes/guest';

export default () => {
    const app = Router();
    user(app);
    guest(app);
    return app;
}