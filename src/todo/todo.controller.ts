import {Request, Response} from "express";
import {Todo} from "./todo.interface";
import {TodoStore} from "./todo.model";
import {ResponseError} from "../utils/ResponseError";

export const todoController = {
    getAllTodos: (req: Request, res: Response) => {
        res.json(TodoStore.todos);
    },

    getTodoById: (req: Request, res: Response) => {
        const id = +req.params.id;
        const index = TodoStore.todos.findIndex(todo => todo.id === id);
        if (index === -1) {
            throw new ResponseError("Todo is not found", 404);
        }
        res.json(TodoStore.todos[index]);
    },

    createTodo: (req: Request, res: Response) => {
        const todo: Todo = req.body;
        TodoStore.todos.push(todo);
        res.json(todo);
    },

    deleteTodoById: (req: Request, res: Response) => {
        const id = +req.params.id;
        TodoStore.todos = TodoStore.todos.filter(todo => todo.id !== id);
        res.json(TodoStore.todos);
    },

    updateTodoById: (req: Request, res: Response) => {
        const id = +req.params.id;
        const {title, description, completed} = req.body;
        const index = TodoStore.todos.findIndex(todo => todo.id === id);

        if (index === -1) {
            throw new ResponseError("Todo is not found", 404);
        }

        TodoStore.todos[index].title = title ?? TodoStore.todos[index].title;
        TodoStore.todos[index].description = description ?? TodoStore.todos[index].description;
        TodoStore.todos[index].completed = completed ?? TodoStore.todos[index].completed;

        res.json(TodoStore.todos[index]);
    }
}