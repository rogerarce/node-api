import {Request, Response, Router} from "express";
import jwt from 'jsonwebtoken';
import joi from 'joi';
import { getRepository } from "typeorm";
import config from "../../config";
import { User } from '../../models/users';
import { encrypt } from "../../utils/encrypt";

const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/register', async (req: Request, res: Response) => {
        const schema = joi.object().keys({
            first_name: joi.string().required(),
            last_name: joi.string().required(),
            email: joi.string().email().required(),
            password: joi.string().min(8).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json(error.details);
        }

        const userRepo = getRepository(User);

        const existingEmail = await userRepo
            .findOne({ where: { email: req.body.email } });

        if (existingEmail) {
            return res.status(400).json({ error: 'Email already exists!' });
        }

        await userRepo.save({
            ...req.body,
            password: encrypt(req.body)
        });

        return res.status(200).send('Signup complete!');
    });

    // @Todo create a function for sending error responses
    route.post('/login', async (req: Request, res: Response) => {
        const schema = joi.object({
            username: joi.string().email().required().exist(),
            password: joi.string().min(6).required().exist()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            const { details } = error;

            return res.status(400).json(details);
        }

        const user = await getRepository(User)
            .findOne({ email: req.body.username });

        if (!user) {
            return res.status(404).send('user not found!');
        }

        const { password, ...userData } = user;

        const token = jwt.sign(userData, config.TOKEN_SECRET, { expiresIn: '5m' });

        return res.json({ access_token: token });
    })
}
