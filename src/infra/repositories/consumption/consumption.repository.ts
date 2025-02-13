import { PrismaClient } from "@prisma/client";
import { ConsumptionEntity } from "../../../domains/consumption/entities/consumption.entity";
import { ConsumptionGateway, FielConsumption } from "../../../domains/consumption/gateways/consumption.gateway";

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

    async findByDevice(id: number, dtInitial : Date, dtFinish : Date, page : number, quantity : number): Promise<ConsumptionEntity[]> {
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
            },
            skip: (page - 1) * quantity,
            take: quantity
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

    async averageConsumption(deviceId : number, field : FielConsumption) : Promise<number | null> {
        const column = field.toString();
        const allowedFields = ["powerUsage", "current", "voltage"]; 

        if (!allowedFields.includes(column)) {
            throw new Error("Invalid flied!");
        }

        const query = `
            SELECT ROUND((SUM(${column}) / COUNT(id)), 2) AS average
            FROM consumption
            WHERE deviceId = ${deviceId}
        `;

        const result = await this.prismaCLient.$queryRawUnsafe<{ average: number | null }[]>(query);

        return result[0]?.average ?? null;
    }

    async checkConsumptions(deviceId : number) {
        const date = new Date();
    
        const dateString = date.toISOString().slice(0, 19).replace('T', ' ');

        console.log(dateString)

        const query = `
            SELECT count(*) as result
            FROM consumption
            WHERE deviceId = ${deviceId}
            AND timestamp BETWEEN DATE_SUB('${dateString}', INTERVAL 9 HOUR) AND '${dateString}';
        `

        const result = await this.prismaCLient.$queryRawUnsafe<{ result: number | null }[]>(query);

        return result[0]?.result ?? null
    }
}