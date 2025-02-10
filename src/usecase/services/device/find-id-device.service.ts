import { DeviceEntity } from "../../../domains/device/entities/device.entity";
import { UserEntity } from "../../../domains/user/entities/user.entity";
import { DeviceRepository } from "../../../infra/repositories/device/device.repository";
import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { UseCase } from "../../usecase";
import { CreateDeviceOutputDto } from "./create-device.service";

export interface FindByIdDeviceInputDto {
    id : number
}

export interface FindByIdDeviceOutputDto extends CreateDeviceOutputDto{}

export class FindByIdDeviceService implements UseCase<FindByIdDeviceInputDto, FindByIdDeviceOutputDto> {

    private constructor(
        private readonly deviceRepository : DeviceRepository,
        private readonly userRepository : UserRepository
    ) {}

    static build(deviceRepository : DeviceRepository, userRepository : UserRepository) {
        return new FindByIdDeviceService(deviceRepository, userRepository)
    }

    async execute(input: FindByIdDeviceInputDto): Promise<FindByIdDeviceOutputDto> {
        const device = await this.deviceRepository.findById(input.id)

        if (!device) {
            throw new Error('Device not found!')
        }

        const user = await this.userRepository.findById(device.userId)

        if (!user) {
            throw new Error('User not found!')
        }

        return this.presentOutput(device, user)
    }

    private presentOutput(input : DeviceEntity, user : UserEntity) : FindByIdDeviceOutputDto {
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