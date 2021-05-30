import express from 'express';
import request from 'supertest';
import routes from '../../src/api';

const app = express();

app.use('/', routes());

describe('Testing guest routes', () => {
    describe('Test registration route', () => {
        it('Should respond status code 200', async () => {
            const response = await request(app).post('/register');
            expect(response.status).toEqual(200);
        });

        it('Should response content-type json', async () => {
            const response = await request(app).post('/register');
            expect(response.headers['content-type']).toContain('json');
        });

        it('Should accept username password', async() => {
            const response = await request(app)
                .post('/register')
                .send({
                    username: 'test',
                    password:' password',
                });

            expect(response.status).toEqual(200);
        });

        it('Should respond with success message', async() => {
            const response = await request(app)
                .post('/register')
                .send({
                    username: 'test',
                    password:' password',
                });

            expect(response.body).not.toBeNull();
        });

        it('Should not failed', () => {
            expect(false).toBeTruthy();
        })
    });
})