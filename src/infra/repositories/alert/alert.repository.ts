import { PrismaClient } from "@prisma/client";
import { AlertEntity } from "../../../domains/alert/entities/alert.entity";
import { AlertGateway } from "../../../domains/alert/gateways/alert.gateway";

export class AlertRepository implements AlertGateway {

    private constructor(private readonly prismaClient : PrismaClient) {}

    static build(prismaClient : PrismaClient) {
        return new AlertRepository(prismaClient)
    }

    async create(alert: AlertEntity): Promise<AlertEntity> {
        console.log('Alerta criado')
        const newAlert = await this.prismaClient.alert.create({
            data: {
                deviceId : alert.deviceId,
                message : alert.message,
                severity : alert.severity,
                resolved : alert.resolved
            }
        })

        console.log(newAlert)

        return AlertEntity.with({
            id: newAlert.id,
            deviceId : newAlert.deviceId,
            message : newAlert.message,
            severity : newAlert.severity,
            resolved : newAlert.resolved
        })
    }

}