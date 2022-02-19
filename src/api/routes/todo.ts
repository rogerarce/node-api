import { Router } from "express";
import { getRepository } from "typeorm";
import joi from 'joi';
import { Todos } from "../../models/todos";
import auth from "../middleware/auth";

const route = Router();

export default (app: Router) => {
    app.use('/todos', route);

    route.get('/', auth, async (req, res) => {
        const user = req.locals.user;

        const todos = await getRepository(Todos)
            .query(`SELECT id, todo, completed FROM todos WHERE user_id = '${user.user_id}'`, []);
        
        return res.status(200).json({ data: todos });
    });

    route.post('/', auth, async (req, res) => {
        const schema = joi.object().keys({
            todo: joi.string().required(),
            completed: joi.boolean().default(false),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json(error.details);
        }

        const user = req.locals.user;

        const { body } = req;

        const todos = await getRepository(Todos)
            .save({ ...body, user_id: user.user_id });
        
        return res.status(200).json(todos);
    });

    route.put('/:id', auth, async (req, res) => {
        const { params } = req;

        const schema = joi.object().keys({
            todo: joi.string().required(),
            completed: joi.boolean().default(false),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json(error.details);
        }

        const response = await getRepository(Todos)
            .findOne(params.id);

        if (!response) {
            return res.status(404).json({ error: 'Item not found!' })
        }

        await getRepository(Todos)
            .update(params.id, req.body);

        const todos = await getRepository(Todos)
            .findOne(params.id);
        
        return res.status(200).json(todos);
    });

    route.delete('/:id', auth, async (req, res) => {
        const { params } = req;

        const todos = await getRepository(Todos)
            .findOne(params.id);

        if (!todos) {
            return res.status(404).json({ error: 'Todo not found!' });
        }

        await getRepository(Todos)
            .delete(params.id);
        
        return res.status(200).json(todos);
    });
}