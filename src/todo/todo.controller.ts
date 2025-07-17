import {NextFunction, Request, Response} from "express";
import {Todo, todoSchema} from "./todo.interface";
import {todoRepository} from "./todo.model";

export const todoController = {
    getAllTodos: (req: Request, res: Response, next: NextFunction) => {
        const userId = +req.user.id;
        todoRepository.getAllTodos(userId).then((todos) => {
            res.json(todos);
        }).catch(next)
    },

    getTodoById: (req: Request, res: Response, next: NextFunction) => {
        const userId = +req.user.id;
        const todoId = +req.params.todoId;
        todoRepository.getTodoById(userId, todoId).then((todos) => {
            res.json(todos);
        }).catch(next);
    },

    createTodo: (req: Request, res: Response, next: NextFunction) => {
        const userId = +req.user.id;
        const todo: Todo = req.body;
        todoSchema.parse(todo);
        todoRepository.createTodo(userId, todo).then((todo) => {
            res.json(todo);
        }).catch(next);
    },


    deleteTodoById: (req: Request, res: Response, next: NextFunction) => {
        const userId = +req.user.id;
        const todoId = +req.params.todoId;
        todoRepository.deleteTodoById(userId, todoId).then((todo) => {
            res.json(todo);
        }).catch(next);
    },

    updateTodoById: (req: Request, res: Response, next: NextFunction) => {
        const userId = +req.user.id;
        const todoId = +req.params.todoId;
        const todo: Todo = req.body;
        todoSchema.parse(todo);
        todoRepository.updateTodoById(userId, todoId, todo).then((todo) => {
            res.json(todo);
        }).catch(next);
    }
}