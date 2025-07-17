import {NextFunction, Request, Response} from "express";
import {userRepository} from "./user.model";
import {User, userSchema} from "./user.interface";
import bcrypt from "bcrypt";
import {ResponseError} from "../utils/ResponseError";
import jwt from "jsonwebtoken";

export const userController = {

    register: (req: Request, res: Response, next: NextFunction) => {
        const user : User = req.body;
        userSchema.parse(user);
        userRepository.createUser(user).then(_ =>
            res.json(user)
        ).catch(next);
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        const {username, password} = req.body;
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            throw new ResponseError("User does not exist", 404);
        }

        const matchedPassword = await bcrypt.compare(password, user.password);
        if (matchedPassword) {
            const secret = process.env.ACCESS_TOKEN_SECRET!;
            const userToSign = {id: user.id, username: user.username}; // Don't sign password
            const token = jwt.sign(userToSign, secret, { expiresIn: '1h' });
            return res.json(token);
        }
        else {
            throw new ResponseError("Incorrect password", 401);
        }
    },

    getAllUsers: (req: Request, res: Response, next: NextFunction) => {
        userRepository.getAllUsers().then(users => {
            res.json(users);
        }).catch(next);
    },

    getUserById: (req: Request, res: Response, next: NextFunction) => {
        let id = +req.params.id;
        userRepository.getUserById(id).then(user => {
            res.json(user);
        }).catch(next);
    },

    updateUser: (req: Request, res: Response, next: NextFunction) => {
        let id = +req.params.id;
        const updateUser : User = req.body;
        userSchema.parse(updateUser);
        userRepository.updateUser(updateUser, id).then(user => {
                res.json(user)
        }).catch(next);
    },

    deleteUser: (req: Request, res: Response, next: NextFunction) => {
        let id = +req.params.id;
        userRepository.deleteUserById(id).then(user => {
            res.json(user);
        }).catch(next);
    }
}