import {Request, Response} from "express";
import {userStore} from "./user.model";
import {User, userSchema} from "./user.interface";

export const userController = {
    getAllUsers: (req: Request, res: Response) => {
        res.json(userStore.users);
    },

    createUser: (req: Request, res: Response) => {
        const user : User = req.body;
        userSchema.parse(user);
        userStore.users.push(user);
        res.json(user);
    }
}