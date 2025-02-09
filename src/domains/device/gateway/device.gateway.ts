import { DeviceEntity } from "../entities/device.entity";

export interface DeviceGateway {
    create(device : DeviceEntity) : Promise<DeviceEntity>
    findBySerialNumber(serial : string) : Promise<DeviceEntity | null>
    findByUser(user : number) : Promise<DeviceEntity | null>
    findById(id : number) : Promise<DeviceEntity | null>
}