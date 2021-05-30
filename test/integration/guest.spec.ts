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

describe('Testing guest routes', () => {
    describe('Test registration route', () => {
        test('Should respond status code 200', async () => {
            const response = await request(app).post('/register');
            expect(response.status).toEqual(200);
        });
        test('Should response content-type json', async () => {
            const response = await request(app).post('/register');
            expect(response.headers['content-type']).toContain('json');
        });
        test('Should accept username password', async() => {
            const response = await request(app)
                .post('/register')
                .send({
                    username: 'test',
                    password:' password',
                });

            expect(response.status).toEqual(200);
        });
        test('Should respond with success message', async() => {
            const response = await request(app)
                .post('/register')
                .send({
                    username: 'test',
                    password:' password',
                });

            expect(response.body).not.toBeNull();
        });
        // Should respond 403 if required fields are not provided
    });

    // @Todo: Continue with test cases
    describe('Test login route', () => {
        test('Should respond with code 200 upon successful sign-in', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'existing_user@gmail.com',
                    password: 'password'
                });

            expect(response.status).toEqual(200);
        });
        test('Should response content-type json', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'existing_user@gmail.com',
                    password: 'password'
                });

            expect(response.headers['content-type']).toContain('json');
        });
        test('Should respond with access_token upon successful sign-in', async () => {
           const { body } = await request(app)
               .post('/login')
               .send({
                   username: 'existing_user@gmail.com',
                   password: 'password'
               });

           expect(body.access_token).toBeDefined();
           expect(body.access_token).not.toBeNull();
        });
        test('Should respond with valid jwt token', async () => {
            const { body } = await request(app)
                .post('/login')
                .send({
                    username: 'existing_user@gmail.com',
                    password: 'password'
                });

            try {
                const result = jwt.verify(body.access_token, config.TOKEN_SECRET);
                expect(result).toBeTruthy();
                expect(result).not.toBeNull();
            } catch (err) {
                expect(err).not.toBeDefined();
            }
        });
        test('Should respond with 400 if password is not provided', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'existing_user@gmail.com',
                });

            expect(response.status).toEqual(400);
        });
        test('Should respond with 400 if username is not provided', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    password: 'password',
                });

            expect(response.status).toEqual(400);
        });
        test('Should respond with 400 if password is not null', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: 'existing_user@gmail.com',
                    password: null,
                });

            expect(response.status).toEqual(400);
        });
        test('Should respond with 400 if username is not null', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: null,
                    password: 'password',
                });

            expect(response.status).toEqual(400);
        });
        test('Should respond with 400 if username is not null', async () => {
            const response = await request(app)
                .post('/login')
                .send({
                    username: null,
                    password: 'password',
                });

            expect(response.status).toEqual(400);
        });
        // Should respond with invalid credentials error provided with incorrect username, password;
        // Should respond with 404 if user is not found
        // Should respond with account not activated if user is not confirm
    });
});