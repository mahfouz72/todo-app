import {NextFunction, Request, Response} from "express";
import {ResponseError} from "../utils/ResponseError";
import jwt from "jsonwebtoken";

export const authenticateJwt =  (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new ResponseError('Access token is missing', 401);
    }

    const secret = process.env.ACCESS_TOKEN_SECRET!;
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            throw new ResponseError('Invalid or expired token', 403);
        }

        req.user = user;
        return next();
    })
}