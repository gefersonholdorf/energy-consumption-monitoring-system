import { Request, Response, NextFunction } from "express";
import { Controller } from "../controller";
import { FindByDeviceConsumptionInputDto, FindByDeviceConsumptionService } from "../../../usecase/services/consumption/find-by-device.service";

export class FindByDeviceConsumptioController implements Controller {

    private constructor(private readonly findByDeviceConsumptionService : FindByDeviceConsumptionService){}

    static build(findByDeviceConsumptionService : FindByDeviceConsumptionService) {
        return new FindByDeviceConsumptioController(findByDeviceConsumptionService)
    }
 
    async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
        const newDate = new Date()

        const firstDay = new Date(newDate.getFullYear(), newDate.getMonth(), 1);

        const lastDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0, 23, 59, 59);

        const page = Number(request.query.page) 
        const quantity = Number(request.query.quantity)

        const dtInitial = request.query.dtInitial ? new Date(request.query.dtInitial as string) : firstDay;
        const dtFinish = request.query.dtFinish ? new Date(request.query.dtFinish as string) : lastDay;
        const deviceId = Number(request.params.id)

        const findByDeviceBody : FindByDeviceConsumptionInputDto = {
            deviceId,
            dtInitial,
            dtFinish,
            page,
            quantity
        }

        try {
            const consumptions = await this.findByDeviceConsumptionService.execute(findByDeviceBody)

            response.status(200).json({
                consumptions,
                page: page,
                quantity: quantity
            })
        } catch (error) {
            next(error)
        }
    }

}