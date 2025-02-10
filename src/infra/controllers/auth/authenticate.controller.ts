import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { AuthenticateInputDto, AuthenticateService } from "../../../usecase/services/auth/authenticate.service";
import { authSchema } from "../../../validations/authenticate.schema";

export class AuthenticateController implements Controller {

    private constructor(private readonly authService : AuthenticateService) {}

    static build(authService : AuthenticateService) {
        return new AuthenticateController(authService)
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const requestBody : AuthenticateInputDto = request.body

        try {
            authSchema.parse(requestBody)
        } catch (error) {
            next(error)
        }

        try {
            const token = await this.authService.execute(requestBody)

            response.status(200).json(token)
        } catch (error) {
            next(error)            
        }
    }
}