import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { CreateConsumptionInputDto, CreateConsumptionService } from "../../../usecase/services/consumption/create-consumption.service";
import { createConsumptionSchema } from "../../../validations/create-consumption.schema";

export class CreateConsumptionController implements Controller {

    private constructor(private readonly createConsumptionService : CreateConsumptionService) {}

    static build(createConsumptionService : CreateConsumptionService) {
        return new CreateConsumptionController(createConsumptionService)
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const deviceId : number = Number(request.params.id)
        const requestBody : CreateConsumptionInputDto = request.body

        try {
            createConsumptionSchema.parse(requestBody)
        } catch (error) {
            next(error)
        }

        try {
            const consumption = await this.createConsumptionService.execute({
                ...requestBody,
                deviceId
            })

            response.status(201).json({
                status: 'Consumption created!',
                consumption
            })
        } catch (error) {
            next(error)
        }
    }

}