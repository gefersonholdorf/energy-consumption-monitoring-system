import { ConsumptionEntity } from "../entities/consumption.entity";

export type FielConsumption = 'powerUsage' | 'voltage' | 'current'

export interface ConsumptionGateway {
    create(consumption : ConsumptionEntity) : Promise<ConsumptionEntity>
    findByDevice(id : number, dtInitial : Date, dtFinish : Date) : Promise<ConsumptionEntity[]>
    averageConsumption(deviceId : number, field : FielConsumption) : Promise<number | null>
}