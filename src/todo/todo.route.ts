import express from "express";
import {todoController} from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:todoId", todoController.getTodoById);
todoRouter.post("/", todoController.createTodo);
todoRouter.delete("/:todoId", todoController.deleteTodoById);
todoRouter.put("/:todoId", todoController.updateTodoById);
