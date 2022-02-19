import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../../config';


const auth = (req, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization.split(' ')[1];

        jwt.verify(accessToken, config.TOKEN_SECRET, { algorithms: ['sha1', 'RS256', 'HS256'] });

        const decoded = jwt.decode(
            accessToken,
            config.TOKEN_SECRET,
            { algorithms: ['sha1', 'RS256', 'HS256'] }
        );

        req.locals = { user: decoded };

        return next();
    } catch (err) {
        return res.status(401).send('Invalid token');
    }
}

export default auth;