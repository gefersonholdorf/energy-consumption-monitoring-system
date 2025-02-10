import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { CreateUserInputDto, CreateUserService } from "../../../usecase/services/user/create-user.service";
import { CreateUserSchema } from "../../../validations/create-user.schema";

export class CreateUserController implements Controller {

    private constructor(private readonly createUserService : CreateUserService) {}

    static build(createUserService : CreateUserService) {
        return new CreateUserController(createUserService)
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const requestBody : CreateUserInputDto = request.body 

        try {
            CreateUserSchema.parse(requestBody)
        } catch (error) {
            next(error)
        }

        try {
            const outputBody = await this.createUserService.execute(requestBody)

            response.status(201).json({
                status: 'User Created!',
                user : outputBody
            })

        } catch (error) {
            next(error)
        }

    }
}