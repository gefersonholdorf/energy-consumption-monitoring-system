import { DeviceEntity, DeviceProps, StatusDevice } from "../../../domains/device/entities/device.entity";
import { UserEntity } from "../../../domains/user/entities/user.entity";
import { DeviceRepository } from "../../../infra/repositories/device/device.repository";
import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { UseCase } from "../../usecase";

export interface CreateDeviceInputDto extends DeviceProps{

}

export interface CreateDeviceOutputDto {
    id : number
    name : string
    serialNumber : string 
    model : string
    location : string
    status : StatusDevice
    user : string
}

export class CreateDeviceService implements UseCase<CreateDeviceInputDto, CreateDeviceOutputDto> {

    private constructor(
        private readonly deviceRepository : DeviceRepository,
        private readonly userRepository : UserRepository
    ) {}
    
    static build(deviceRepository : DeviceRepository, userRepository : UserRepository) {
        return new CreateDeviceService(deviceRepository, userRepository)
    }

    async execute(input: CreateDeviceInputDto): Promise<CreateDeviceOutputDto> {

        const user = await this.userRepository.findById(input.userId)

        if (!user) {
            throw new Error('User not found!')
        }
        
        const device : DeviceEntity = DeviceEntity.build({
            name : input.name,
            serialNumber : input.serialNumber,
            model : input.model,
            location : input.location,
            userId : user.id
        })

        const newDevice = await this.deviceRepository.create(device)

        return this.presenteOutput(newDevice, user)
    }

    private presenteOutput(input : DeviceEntity, user : UserEntity) : CreateDeviceOutputDto {
        return {
            id: input.id,
            name: input.name,
            serialNumber: input.serialNumber, 
            model: input.model,
            location: input.location,
            status: input.status,
            user : user.name
        }
    }
}