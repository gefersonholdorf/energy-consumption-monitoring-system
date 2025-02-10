import { ConsumptionEntity } from "../../../domains/consumption/entities/consumption.entity"
import { ConsumptionRepository } from "../../../infra/repositories/consumption/consumption.repository"
import { DeviceRepository } from "../../../infra/repositories/device/device.repository"
import { UseCase } from "../../usecase"

export interface FindByDeviceConsumptionInputDto {
    deviceId : number
    dtInitial : Date
    dtFinish : Date
}

export interface FindByDeviceConsumptionOutputDto {
    consumptions: {
        id : number
        powerUsage : number
        voltage : number
        current : number
        timestamp : Date
    }[]
}

export class FindByDeviceConsumptionService implements UseCase<FindByDeviceConsumptionInputDto, FindByDeviceConsumptionOutputDto> {

    private constructor(
        private readonly consumptionRepository : ConsumptionRepository,
        private readonly deviceRepository : DeviceRepository
    ) {}

    static build(consumptionRepository : ConsumptionRepository, deviceRepository : DeviceRepository) {
        return new FindByDeviceConsumptionService(consumptionRepository, deviceRepository)
    }

    async execute(input: FindByDeviceConsumptionInputDto): Promise<FindByDeviceConsumptionOutputDto> {

        const device = await this.deviceRepository.findById(input.deviceId)

        if(!device) {
            throw new Error('Device not found!')
        }
        
        const consumptions = await this.consumptionRepository.findByDevice(input.deviceId, input.dtInitial, input.dtFinish)

        if(consumptions.length <= 0) {
            throw new Error('No results found!')
        }

        return this.presentOutput(consumptions)
    }

    private presentOutput(input : ConsumptionEntity[]) : FindByDeviceConsumptionOutputDto {
        const consumptions = input.map((consumption) => {
            return {
                id: consumption.id,
                powerUsage: consumption.powerUsage,
                voltage: consumption.voltage,
                current: consumption.current,
                timestamp: consumption.timestamp
            }
        })

        return { consumptions }
    }  

}