import { PrismaClient } from "@prisma/client";
import { ConsumptionEntity } from "../../../domains/consumption/entities/consumption.entity";
import { ConsumptionGateway } from "../../../domains/consumption/gateways/consumption.gateway";

export class ConsumptionRepository implements ConsumptionGateway {

    private constructor(private readonly prismaCLient : PrismaClient){}

    static build(prismaClient : PrismaClient) {
        return new ConsumptionRepository(prismaClient)
    }

    async create(consumption: ConsumptionEntity): Promise<ConsumptionEntity> {
        const newConsumption = await this.prismaCLient.consumption.create({
            data: {
                id: consumption.id,
                deviceId: consumption.deviceId,
                powerUsage: consumption.powerUsage,
                voltage: consumption.voltage,
                current: consumption.current,
                timestamp: consumption.timestamp
            }
        })

        return ConsumptionEntity.with({
            id: newConsumption.id,
            deviceId: newConsumption.deviceId,
            powerUsage: newConsumption.powerUsage,
            voltage: newConsumption.voltage,
            current: newConsumption.current,
            timestamp: newConsumption.timestamp
        })
    }

    async findByDevice(id: number, dtInitial : Date, dtFinish : Date): Promise<ConsumptionEntity[]> {
        const consumptions = await this.prismaCLient.consumption.findMany({
            where: {
                AND: [
                    { 
                        deviceId: id
                    },
                    {
                        timestamp: {
                            gte: dtInitial,
                            lte: dtFinish
                        }
                    }
                ]
            },
            orderBy: {
                timestamp: 'asc'
            }
        })

        const outputConsumptions = consumptions.map((consumption) => {
            return ConsumptionEntity.with({
                id: consumption.id,
                deviceId: consumption.deviceId,
                powerUsage: consumption.powerUsage,
                voltage: consumption.voltage,
                current: consumption.current,
                timestamp: consumption.timestamp
            })
        })

        return outputConsumptions
    }

}