import express from "express";
import {todoController} from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.get("/", todoController.getAllTodos);
todoRouter.get("/:id", todoController.getTodoById);
todoRouter.post("/", todoController.createTodo);
todoRouter.delete("/:id", todoController.deleteTodoById);
todoRouter.put("/:id", todoController.updateTodoById);
