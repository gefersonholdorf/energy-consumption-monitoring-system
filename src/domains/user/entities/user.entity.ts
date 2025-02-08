const bcryptjs = require("bcryptjs")

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
            ...props,
            password: bcryptjs.hash(props.password, 10)
        })
    }

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

    get password(): never {
        throw new Error("Access to password is restricted.");
    }

    public async verifyPassword(plainPassword: string): Promise<boolean> {
        return await bcryptjs.compare(plainPassword, this.props.password);
    }
}