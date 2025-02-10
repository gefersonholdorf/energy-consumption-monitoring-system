import { ConsumptionEntity } from "../entities/consumption.entity";

export interface ConsumptionGateway {
    create(consumption : ConsumptionEntity) : Promise<ConsumptionEntity>
    findByDevice(id : number) : Promise<ConsumptionEntity[]>
}