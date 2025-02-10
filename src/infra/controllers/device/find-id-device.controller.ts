import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { FindByIdDeviceService } from "../../../usecase/services/device/find-id-device.service";

export class FindByIdDeviceController implements Controller {

    private constructor(private readonly findByIdDeviceService : FindByIdDeviceService) {}

    static build(findByIdDeviceService : FindByIdDeviceService) {
        return new FindByIdDeviceController(findByIdDeviceService)
    }

    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const id : number = Number(request.params.id) 

        try {
            const device = await this.findByIdDeviceService.execute({id})

            response.status(200).json(device)
        } catch (error) {
            next(error)
        }
    }

}