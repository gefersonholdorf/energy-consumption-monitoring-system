import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function authenticate(request : Request, response : Response, next : NextFunction) {
    const bearer = request.headers.authorization

    if (!bearer) {
        response.status(401).json({
            message: 'Unauthorized access!'
        })
        return 
    }

    const [, token] = bearer.split(" ")

    try {
        jwt.verify(
            token,
            process.env.SECRET_KEY || 'palavrasecreta'
        )

        next()

    } catch (error) {
        response.status(401).json({
            message: 'Invalid token!'
        })
        return
    }
}