import { AlertEntity } from "../entities/alert.entity";

export interface AlertGateway {
    create(alert : AlertEntity) : Promise<AlertEntity>
}