import {NextFunction, Request, Response} from 'express';
import {ResponseError} from "../utils/ResponseError";
import {ZodError} from "zod";
import {PrismaClientKnownRequestError} from '../../generated/prisma/runtime/library';

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
        else if (err instanceof PrismaClientKnownRequestError) {
            return handlePrismaErrors(err, res);
        }

        res.status(500).send(err.message || "Internal Server Error");
    }

function handlePrismaErrors(err: PrismaClientKnownRequestError, res: Response) {
    if (err.code === 'P2002') {
        return res.status(409).json({
            message: `This field value already exists.`,
            meta: err.meta,
        });
    }
    else if (err.code === 'P2025') {
        return res.status(404).json({
            message: `This field value does not exist.`,
            meta: err.meta,
        });
    }

    return res.status(500).json({
        message: `An unknown database error occurred.`,
        meta: err.meta,
    });
}
