export interface ConsumptionProps {
    id ?: number
    deviceId : number
    powerUsage : number
    voltage : number
    current : number
    timestamp : Date
}

export class ConsumptionEntity {
    private constructor(private props : ConsumptionProps) {}
    
        public static build(props : ConsumptionProps) {
            return new ConsumptionEntity({
                ...props
        })}
    
        public static with(props : ConsumptionProps) {
            return new ConsumptionEntity(props)
        }
    
        get id(): number {
            return this.props.id!;
        }

        get deviceId(): number {
            return this.props.deviceId;
        }
    
        get powerUsage(): number {
            return this.props.powerUsage;
        }
    
        get voltage(): number {
            return this.props.voltage;
        }
    
        get current(): number {
            return this.props.current;
        }
    
        get timestamp(): Date {
            return this.props.timestamp!;
        }
}