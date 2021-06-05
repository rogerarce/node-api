import {Router} from "express";
import auth from '../middleware/auth';

const route = Router()

export default (app: Router) => {
    app.use('/user', route);

    route.get('/me', auth, async (req, res) => {
        return res.json({
            name: 'sean',
        });
    })
}