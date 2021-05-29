import jwt from 'express-jwt';
import config from '../../config';

const bearerToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }

    return null;
}

const auth = jwt({
    secret: config.TOKEN_SECRET,
    algorithms: ['sha1', 'RS256', 'HS256'],
    getToken: bearerToken,
});

export default auth;