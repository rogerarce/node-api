import {Router} from "express";
const route = Router()

export default (app: Router) => {
    app.use('/user', route);

    route.get('/me', (req, res) => {
        return res.json({
            name: 'sean',
        });
    })
}