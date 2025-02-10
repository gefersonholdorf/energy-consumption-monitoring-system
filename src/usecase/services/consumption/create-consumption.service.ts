import { ConsumptionEntity, ConsumptionProps } from "../../../domains/consumption/entities/consumption.entity";
import { DeviceEntity } from "../../../domains/device/entities/device.entity";
import { ConsumptionRepository } from "../../../infra/repositories/consumption/consumption.repository";
import { DeviceRepository } from "../../../infra/repositories/device/device.repository";
import { UseCase } from "../../usecase";

export interface CreateConsumptionInputDto extends ConsumptionProps{}

export interface CreateConsumptionOutputDto {
    id : number
    device : string
    powerUsage : number
    voltage : number
    current : number
    timestamp : Date
}

export class CreateConsumptionService implements UseCase<CreateConsumptionInputDto, CreateConsumptionOutputDto> {

    private constructor(
        private readonly consumptionRepository : ConsumptionRepository,
        private readonly deviceRepository : DeviceRepository
    ) {}

    static build(consumptionRepository : ConsumptionRepository, deviceRepository : DeviceRepository) {
        return new CreateConsumptionService(consumptionRepository, deviceRepository)
    }

    async execute(input: CreateConsumptionInputDto): Promise<CreateConsumptionOutputDto> {

        const device = await this.deviceRepository.findById(input.deviceId)

        if (!device) {
            throw new Error('Device not found!')
        }

        const consumptionBody : ConsumptionEntity = ConsumptionEntity.build({
            ...input
        })
        
        const newConsumption = await this.consumptionRepository.create(consumptionBody)

        return this.presentOutput(newConsumption, device)
    }

    private presentOutput(input : ConsumptionEntity, device : DeviceEntity) : CreateConsumptionOutputDto {
        return {
            id: input.id,
            device: device.serialNumber,
            powerUsage: input.powerUsage,
            voltage: input.voltage,
            current: input.current,
            timestamp: input.timestamp
        }
    }

}