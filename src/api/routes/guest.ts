import {Router} from "express";
import jwt from 'jsonwebtoken';
import config from "../../config";

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/register', (req, res) => {
        return res.json(req.body);
    });

    route.post('/login', (req, res) => {
        const token = jwt.sign(req.body, config.TOKEN_SECRET);

        return res.json({
            access_token: token,
        });
    })
}