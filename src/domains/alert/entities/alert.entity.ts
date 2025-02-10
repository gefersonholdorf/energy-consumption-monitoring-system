export type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface AlertProps {
    id ?: number
    deviceId : number
    message : string
    severity : AlertSeverity
    resolved ?: boolean
    createdAt ?: Date
}

export class AlertEntity {
    private constructor(private props : AlertProps) {}

    public static build(props : AlertProps) {
        return new AlertEntity({
            ...props,
            resolved: false
    })}

    public static with(props : AlertProps) {
        return new AlertEntity(props)
    }

    get id(): number {
        return this.props.id!;
    }

    get deviceId(): number {
        return this.props.deviceId;
    }

    get message(): string {
        return this.props.message;
    }

    get severity(): AlertSeverity {
        return this.props.severity;
    }

    get resolved(): boolean {
        return this.props.resolved!;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }
}