import bodyParser from 'body-parser';
import express from 'express';
import { send } from 'process';
import request from 'supertest';
import routes from '../../src/api';
import TestHelper from '../test-helper';

const app = express()
let access_token = null;

beforeAll(async () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/', routes());

    await TestHelper.instance.setupDatabase();

    await request(app)
        .post('/register')
        .send({
            first_name: 'test',
            last_name: 'test',
            email: 'test@gmail.com',
            password: 'password',
        });

    const { body } = await request(app)
        .post('/login').send({ username: 'test@gmail.com', password: 'password' });

    access_token = body.access_token;
});

afterAll(() => {
    TestHelper.instance.teardownTestDB();
});

describe('Test /todos routes', () => {

    describe('Test post todos', () => {
        test('Should respond with status 200', async () => {
            const response = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'do something later', completed: false });

            expect(response.status).toEqual(200);
        });
        test('Should respond with status 400 with invalid request body', async () => {
            const response = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            expect(response.status).toEqual(400);
        });
        test('Should respond with status 200 match request body', async () => {
            const response = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'test', completed: false });

            expect(response.status).toEqual(200);
            expect(response.body).toMatchObject({ todo: 'test', completed: false });
        });
    });

    describe('Test get todos', () => {
        test('Should respond with 200 status', async () => {
            const response = await request(app)
                .get('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            expect(response.status).toEqual(200);
        });

        test('Should respond with data', async() => {
            const response = await request(app)
                .get('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            expect(response.status).toEqual(200);
            expect(response.body.data).toBeTruthy();
        });

        test('Should respond with created todos', async() => {
            await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'test 1', completed: false });

            const response = await request(app)
                .get('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            const expected = [expect.objectContaining({ todo: 'test 1', completed: 0 })];

            expect(response.status).toEqual(200);
            expect(response.body.data).toEqual(expect.arrayContaining(expected));
        });
    });

    describe('Test update todo route', () => {
        test('Should respond with 200 status', async () => {
            const create = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'buy me coffee', completed: false });

            const update = await request(app)
                .put(`/todos/${create.body.id}`)
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'buy me coffee', completed: true });
        
            expect(update.status).toEqual(200);
        });
        
        test('Should respond with 404 status', async () => {
            const update = await request(app)
                .put(`/todos/1`)
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'buy me coffee', completed: true });
        
            expect(update.status).toEqual(404);
        });
                
        test('Should respond with 400 status', async () => {
            const update = await request(app)
                .put(`/todos/1`)
                .set('Authorization', 'Bearer ' + access_token)
                .send({ completed: true });
        
            expect(update.status).toEqual(400);
        });
                
        test('Should respond with 200 status, todo should be updated', async () => {
            const create = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'buy me coffee', completed: false });
            
            const update = await request(app)
                .put(`/todos/${create.body.id}`)
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'updated todo', completed: true });
                            
            const listing = await request(app)
                .get(`/todos`)
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            const expected = [expect.objectContaining({ todo: 'updated todo', completed: 1 })];
        
            expect(update.status).toEqual(200);
            expect(listing.body.data).toEqual(expect.arrayContaining(expected));
        });

    });

    describe('Test delete todo route', () => {

        test('Should respond with 200', async () => {
            const create = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'buy me coffee', completed: false });

            const remove = await request(app)
                .delete(`/todos/${create.body.id}`)
                .set('Authorization', 'Bearer ' + access_token)
                .send();
    
            expect(remove.status).toEqual(200);
        });

        test('Should respond with 404', async () => {
            const remove = await request(app)
                .delete(`/todos/1`)
                .set('Authorization', 'Bearer ' + access_token)
                .send();
    
            expect(remove.status).toEqual(404);
        });

        test('Should respond without deleted item', async () => {
            const create = await request(app)
                .post('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send({ todo: 'to delete', completed: false });

            const remove = await request(app)
                .delete(`/todos/${create.body.id}`)
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            const listing = await request(app)
                .get('/todos')
                .set('Authorization', 'Bearer ' + access_token)
                .send();

            const expected = [expect.objectContaining({ todo: 'to delete', completed: false })]
    
            expect(remove.status).toEqual(200);
            expect(remove.body).toEqual(expected[0]);
            expect(listing.body.data).toEqual(expect.not.arrayContaining(expected));
        });

    });

});