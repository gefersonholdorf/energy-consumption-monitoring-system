import { PrismaClient } from "@prisma/client";
import { DeviceEntity } from "../../../domains/device/entities/device.entity";
import { DeviceGateway } from "../../../domains/device/gateway/device.gateway";

export class DeviceRepository implements DeviceGateway {

    private constructor(private readonly prismaClient : PrismaClient) {}

    static build(prismaClient : PrismaClient) {
        return new DeviceRepository(prismaClient)
    }

    async create(device: DeviceEntity): Promise<DeviceEntity> {
        const newDevice = await this.prismaClient.device.create({
            data: {
            name: device.name,
            serialNumber: device.serialNumber, 
            model: device.model,
            location: device.location,
            status: device.status,
            userId: device.userId
        }})

        return DeviceEntity.with({
            id: newDevice.id,
            name: newDevice.name,
            serialNumber: newDevice.serialNumber, 
            model: newDevice.model,
            location: newDevice.location,
            status: newDevice.status,
            userId: newDevice.userId
        })
    }

    async findBySerialNumber(serial: string): Promise<DeviceEntity | null> {
        const device = await this.prismaClient.device.findFirst({
            where: {
                serialNumber: serial
            }
        })

        return device ? DeviceEntity.with({
            id: device.id,
            name: device.name,
            serialNumber: device.serialNumber, 
            model: device.model,
            location: device.location,
            status: device.status,
            userId: device.userId
        }) : null
    }

    async findByUser(user: number): Promise<DeviceEntity | null> {
        const device = await this.prismaClient.device.findFirst({
            where: {
                userId: user
            }
        })

        return device ? DeviceEntity.with({
            id: device.id,
            name: device.name,
            serialNumber: device.serialNumber, 
            model: device.model,
            location: device.location,
            status: device.status,
            userId: device.userId
        }) : null
    }

    async findById(id: number): Promise<DeviceEntity | null> {
        const device = await this.prismaClient.device.findFirst({
            where: {
                id
            }
        })

        return device ? DeviceEntity.with({
            id: device.id,
            name: device.name,
            serialNumber: device.serialNumber, 
            model: device.model,
            location: device.location,
            status: device.status,
            userId: device.userId
        }) : null
    }

}