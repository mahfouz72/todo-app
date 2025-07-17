import {Request, Response, NextFunction} from "express";
import {authenticateJwt} from "./authentication";

const openEndpoints = [
    {method: "POST", path: "/users/register"},
    {method: "POST", path: "/users/login"},
]


export const authenticationFilter =
    (req: Request, res: Response, next: NextFunction) => {

    const isOpenEndpoint = openEndpoints.some(
        endpoint =>
            endpoint.method === req.method && endpoint.path === req.path
    );

    if (isOpenEndpoint) {
        return next();
    }

    authenticateJwt(req, res, next);
}