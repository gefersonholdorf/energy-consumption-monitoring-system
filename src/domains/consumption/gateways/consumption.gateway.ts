import { ConsumptionEntity } from "../entities/consumption.entity";

export interface ConsumptionGateway {
    create(consumption : ConsumptionEntity) : Promise<ConsumptionEntity>
    findByDevice(id : number, dtInitial : Date, dtFinish : Date) : Promise<ConsumptionEntity[]>
}