import express from "express";
import {todoController} from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.get("/:userId", todoController.getAllTodos);
todoRouter.get("/:userId/todo/:todoId", todoController.getTodoById);
todoRouter.post("/:userId", todoController.createTodo);
todoRouter.delete("/:userId/todo/:todoId", todoController.deleteTodoById);
todoRouter.put("/:userId/todo/:todoId", todoController.updateTodoById);
