import { AlertEntity } from "../../../domains/alert/entities/alert.entity";
import { ConsumptionEntity, ConsumptionProps } from "../../../domains/consumption/entities/consumption.entity";
import { DeviceEntity } from "../../../domains/device/entities/device.entity";
import { AlertRepository } from "../../../infra/repositories/alert/alert.repository";
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
        private readonly deviceRepository : DeviceRepository,
        private readonly alertRepository : AlertRepository
    ) {}

    static build(consumptionRepository : ConsumptionRepository, deviceRepository : DeviceRepository, alertRepository : AlertRepository) {
        return new CreateConsumptionService(consumptionRepository, deviceRepository, alertRepository)
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

        await this.verifyAverageConsumptions(newConsumption)

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

    private async verifyAverageConsumptions(consumption : ConsumptionEntity) : Promise<void>{
        const powerUsage = (Number(process.env.PERCENTAGE || 120) / 100) * (await this.consumptionRepository.averageConsumption(consumption.deviceId, 'powerUsage') || 0)
        const voltage = (Number(process.env.PERCENTAGE || 120) / 100) * (await this.consumptionRepository.averageConsumption(consumption.deviceId, 'voltage') || 0)
        const current = (Number(process.env.PERCENTAGE || 120) / 100) * (await this.consumptionRepository.averageConsumption(consumption.deviceId, 'current') || 0)

        if (consumption.powerUsage > powerUsage) {
            const message = "Sudden increase in consumption detected!"
            const alert = this.renderAlert(consumption.deviceId, message)

            await this.alertRepository.create(alert)
        }

        if (consumption.voltage > voltage) {
            const message = "Abnormal voltage variation detected!"
            const alert = this.renderAlert(consumption.deviceId, message)

            await this.alertRepository.create(alert)
        }

        if (consumption.current > current) {
            console.log(consumption.current)
            console.log(current)
            const message = "Sudden increase in electrical current!"
            const alert = this.renderAlert(consumption.deviceId, message)

            await this.alertRepository.create(alert)
        }
    }

    private renderAlert(deviceId : number, message : string) : AlertEntity {
        return AlertEntity.build({
            deviceId,
            message,
            severity: 'MEDIUM'
        })
    }

}