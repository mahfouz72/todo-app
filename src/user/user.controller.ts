import {Request, Response} from "express";
import {z} from 'zod';
import {User} from "./user.interface";
import {userStore} from "./user.model";

const userSchema = z.object({
    username: z.string(),
    password: z.string().min(8, "Password must be at least 8 characters"),
})

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
            res.status(400).send(error);
        }
    }
}