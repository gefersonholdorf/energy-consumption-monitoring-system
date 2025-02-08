import { DeviceEntity } from "../entities/device.entity";

export interface DeviceGateway {
    create(device : DeviceEntity) : Promise<DeviceGateway>
    findBySerialNumber(serial : string) : Promise<DeviceGateway | null>
    findByUser(user : number) : Promise<DeviceGateway | null>
    findById(id : number) : Promise<DeviceGateway | null>
}