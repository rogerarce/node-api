import {Router} from "express";
import user from "./routes/user";
import guest from './routes/guest';
import todos from './routes/todo';

export default () => {
    const app = Router();
    user(app);
    guest(app);
    todos(app);
    return app;
}