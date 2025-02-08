export type StatusDevice = 'ACTIVE' | 'INACTIVE' | 'DISCONNECTED'

export interface DeviceProps {
    id ?: number
    name : string
    serialNumber : string 
    model : string
    location : string
    status : StatusDevice
    userId : number   
    createdAt ?: Date
    updatedAt ?: Date
}

export class DeviceEntity {

    private constructor(private props : DeviceProps) {}

    public static build(props : DeviceProps) {
        return new DeviceEntity(props)
    }

    public static with(props : DeviceProps) {
        return new DeviceEntity(props)
    }

    get id(): number {
        return this.props.id!;
    }

    get name(): string {
        return this.props.name;
    }

    get serialNumber(): string {
        return this.props.serialNumber;
    }

    get model(): string {
        return this.props.model;
    }

    get location() : string {
        return this.props.location
    }

    get status() : StatusDevice {
        return this.props.status
    }

    get userId() : number {
        return this.props.userId
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    get updatedAt(): Date {
        return this.props.updatedAt!;
    }
}