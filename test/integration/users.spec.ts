import express from 'express';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import routes from '../../src/api';
import bodyParser from "body-parser";
import TestHelper from '../test-helper';

const app = express();
let access_token = null;

// Require on all api endpoint tests
beforeAll(async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use('/', routes());
    await TestHelper.instance.setupDatabase()
    await request(app)
        .post('/register')
        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'test@gmail.com',
            password: 'password'
        });
    const singInResponse = await request(app)
        .post('/login')
        .send({
            username: 'test@gmail.com',
            password: 'password'
        });

    access_token = singInResponse.body.access_token;
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe('Test "users" route', () => {

    describe('Test "/me" route' , () => {

        describe('Test with valid access_token', () => {
            // @Todo should be replaced with proper fields when signing access_token

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
            });
        });

        describe('Test with invalid access_token', () => {
            const invalid_token = jwt.sign({
                username: 'sample@test.com',
                password: 'password'
            }, 'randomKey');

            test('Should respond with 401 provided with invalid access_token', async () => {
                const { status } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + invalid_token);

                expect(status).toEqual(401);
            });
        });

        describe('Test authenticated user data', () => {
            test('Should respond with authenticated users data', async () => {
                const { body } = await request(app)
                    .get('/user/me')
                    .set('Authorization', 'Bearer ' + access_token);

                const user = {
                    user_id: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                };

                expect(Object.keys(body)).toStrictEqual(Object.keys(user));
            });
        })

    });
});