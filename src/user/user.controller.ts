import {NextFunction, Request, Response} from "express";
import {userRepository} from "./user.model";
import {User, userSchema} from "./user.interface";

export const userController = {
    getAllUsers: (req: Request, res: Response, next: NextFunction) => {
        userRepository.getAllUsers().then(users => {
            res.json(users);
        }).catch(next);
    },

    createUser: (req: Request, res: Response, next: NextFunction) => {
        const user : User = req.body;
        userSchema.parse(user);
        userRepository.createUser(user).then(_ =>
            res.json(user)
        ).catch(next);
    }
}