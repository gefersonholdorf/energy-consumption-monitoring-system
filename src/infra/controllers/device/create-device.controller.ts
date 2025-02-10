import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { CreateDeviceInputDto, CreateDeviceService } from "../../../usecase/services/device/create-device.service";
import { createDeviceSchema } from "../../../validations/create-device.schema";

export class CreateDeviceController implements Controller {

    private constructor(private readonly createDeviceService : CreateDeviceService) {}

    static build(createDeviceService : CreateDeviceService) {
        return new CreateDeviceController(createDeviceService)
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const requestBody : CreateDeviceInputDto = request.body

        try {
            createDeviceSchema.parse(requestBody)
        } catch (error) {
            next(error)
        }

        try {
            const device = await this.createDeviceService.execute(requestBody)

            response.status(201).json({
                status: 'Device Created!',
                device
            })
        } catch (error) {
            next(error)
        }
    }

}