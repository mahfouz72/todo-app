import express from "express";
import {todoController} from "./todo.controller";

export const todoRouter = express.Router();

todoRouter.get("/", todoController.getAllTodos);
