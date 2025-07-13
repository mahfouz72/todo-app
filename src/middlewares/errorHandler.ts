import {NextFunction, Request, Response} from 'express';
import {ResponseError} from "../utils/ResponseError";
import {ZodError} from "zod";

export const errorHandler =
    (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ZodError) {
        const schemaValidationError = err.issues.map(issue => ({
            field: issue.path,
            message: issue.message,
        }));

        return res.status(400).json(schemaValidationError);
    }
    else if (err instanceof ResponseError) {
        return res.status(err.statusCode).send(err.message);
    }

    res.status(500).send(err.message || "Internal Server Error");
}