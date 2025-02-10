export interface UserProps {
    id ?: number
    name : string
    email : string
    password : string
    enterprise : string 
    createdAt ?: Date
    updatedAt ?: Date
}

export class UserEntity {
    private constructor(private props : UserProps) {}

    public static build(props : UserProps) {
        return new UserEntity({
            ...props
    })}

    public static with(props : UserProps) {
        return new UserEntity(props)
    }

    get id(): number {
        return this.props.id!;
    }

    get name(): string {
        return this.props.name;
    }

    get email(): string {
        return this.props.email;
    }

    get enterprise(): string {
        return this.props.enterprise;
    }

    get createdAt(): Date {
        return this.props.createdAt!;
    }

    get updatedAt(): Date {
        return this.props.updatedAt!;
    }

    get password(): string {
        return this.props.password;
    }
}