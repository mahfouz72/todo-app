import {Request, Response} from "express";
import {todos} from "./todo.model";

export const todoController = {
    getAllTodos: (req: Request, res: Response) => {
        res.json(todos);
    },
}