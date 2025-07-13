import express from "express"
import {userController} from "./user.controller";

export const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/", userController.createUser);