import {Request, Response, Router} from "express";
import jwt from 'jsonwebtoken';
import joi from 'joi';
import config from "../../config";

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/register', (req: Request, res: Response) => {
        return res.json(req.body);
    });

    // @Todo create a function for sending error responses
    route.post('/login', (req: Request, res: Response) => {
        const schema = joi.object({
            username: joi.string().email().required().exist(),
            password: joi.string().min(6).required().exist()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            const { details } = error;

            return res.status(400).json(details);
        }

        const token = jwt.sign(req.body, config.TOKEN_SECRET);

        return res.json({
            access_token: token,
        });
    })
}