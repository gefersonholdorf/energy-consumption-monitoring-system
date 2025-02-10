import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function catchException(err : Error, request : Request, response : Response, next : NextFunction) {

    if (err instanceof ZodError) {
        response.status(400).json({
            status: 'Validation Error!',
            message: err.issues[0].message
        })
    }

    console.log(err)
    response.status(400).json({
        status: err.name,
        message: err.message
    })
} 