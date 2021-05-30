import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import routes from '../../src/api';
import bodyParser from "body-parser";
import config from "../../src/config";

const app = express();

// Require on all api endpoint tests
beforeAll(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/', routes());
});

describe('Test "users" route', () => {

    describe('Test "/me" route' , () => {

        describe('Test with valid access_token', () => {
            // @Todo should be replaced with proper fields when signing access_token
            const access_token = jwt.sign({
                username: 'sample@test.com',
                password: 'password'
            }, config.TOKEN_SECRET);

            test('Should respond with 200 provided with valid access_token', async () => {
                const { status } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token)

                expect(status).toEqual(200);
            });
            test('Should response content-type json', async () => {
                const response = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token);

                expect(response.headers['content-type']).toContain('json');
            });
            test('Should respond with object provided with valid access_token', async () => {
                const { body } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token)

                expect(typeof body).toEqual('object');
            })
            test('Should respond with object containing user fields provided with valid access_token', async () => {
                const { body } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token);

                const keys = Object.keys(body);

                const userFields = {
                    name: 'sample',
                };

                expect(keys).toStrictEqual(Object.keys(userFields));
            })
            test('Should respond with object containing user fields provided with valid access_token', async () => {
                const { body } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token);

                const keys = Object.keys(body);

                const userFields = {
                    name: 'sample',
                };

                expect(keys).toStrictEqual(Object.keys(userFields));
            })
        });

        describe('Test with invalid access_token', () => {
            const invalid_token = jwt.sign({
                username: 'sample@test.com',
                password: 'password'
            }, 'randomKey');

            const access_token = jwt.sign({
                username: 'sample@test.com',
                password: 'password'
            }, 'randomKey');

            test('Should respond with 401 provided with invalid access_token', async () => {
                const { status } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + invalid_token);

                expect(status).toEqual(401);
            });
            test('Should respond with 401 if access_token is not placed in "Bearer"', async () => {
                const { status } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'bearer ' + access_token);

                expect(status).toEqual(401);
            })
            test('Should respond with 40 if access_token is not placed in headers authorization field', async () => {
                const { status } = await request(app)
                    .get('/user/me')
                    .set('x-authorization-token', access_token);

                expect(status).toEqual(401);
            })
        });

    });
});