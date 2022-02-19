import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";
import { User } from "../../models";
import auth from '../middleware/auth';

const route = Router();

export default (app: Router) => {
    app.use('/user', route);

    route.get('/me', auth, async (req: Request, res: Response) => {
        const localUser = req.locals.user;

        const response = await getRepository(User)
            .findOne(localUser.user_id);

        const { password, ...user } = response;

        return res.status(200).json(user);
    });
}