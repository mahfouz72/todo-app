import {Request, Response} from "express";
import {userStore} from "./user.model";
import {User, userSchema} from "./user.interface";
import {ZodError} from "zod";

export const userController = {
    getAllUsers: (req: Request, res: Response) => {
        res.json(userStore.users);
    },

    createUser: (req: Request, res: Response) => {
        try {
            const user : User = req.body;
            userSchema.parse(user);
            userStore.users.push(user);
            res.json(user);
        }
        catch (error) {
            if (error instanceof ZodError) {
                res.status(400).send(error.issues);
            }
        }
    }
}