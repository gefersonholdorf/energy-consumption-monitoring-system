import { DeviceEntity } from "../domains/device/entities/device.entity";
import { ConsumptionRepository } from "../infra/repositories/consumption/consumption.repository";
import { DeviceRepository } from "../infra/repositories/device/device.repository";

export class CheckConsumption {
    private constructor(
        private readonly consumptionRepository : ConsumptionRepository,
        private readonly deviceRepository : DeviceRepository
    ) {}

    static build(consumptionRepository : ConsumptionRepository, deviceRepository : DeviceRepository) {
        return new CheckConsumption(consumptionRepository, deviceRepository)
    }

    async execute() {
        console.log('Começando a executar Check...')

        const devices : DeviceEntity[] = await this.deviceRepository.findAll()

        for(const device of devices) {
            await this.executeCheck(device.id)
        }
    }

    private async executeCheck(deviceId : number) : Promise<void> {
        console.log('Executando Check Device')
        try {
            const device = await this.deviceRepository.findById(deviceId)

            if (!device) {
                console.log('Device not found')
                return
            }
    
            const result : number = await this.consumptionRepository.checkConsumptions(deviceId) || 0
    
            if (result > 0) {
                return
            }

            if (device.status == 'DISCONNECTED') {
                return
            }
            
            console.log('Disable Device')
            return await this.deviceRepository.disableDevice(deviceId)   
        } catch (error) {
            console.log(error)
            return
        }
    }
}