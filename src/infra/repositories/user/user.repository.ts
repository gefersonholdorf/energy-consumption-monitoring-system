import { PrismaClient } from "@prisma/client";
import { UserEntity } from "../../../domains/user/entities/user.entity";
import { UserGateway } from "../../../domains/user/gateways/user.gateway";

export class UserRepository implements UserGateway {

    private constructor(private readonly prismaClient : PrismaClient){}

    static build(prismaClient : PrismaClient) {
        return new UserRepository(prismaClient)
    }

    async create(user: UserEntity): Promise<UserEntity> {
        const newUser = await this.prismaClient.user.create({
            data: {
                name: user.name,
                email: user.email,
                password : user.password,
                enterprise : user.enterprise
            }
        })

        return UserEntity.with({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            enterprise: newUser.enterprise
        })
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        const user = await this.prismaClient.user.findFirst({
            where: {
                email
            }
        })

        return user ? UserEntity.with({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            enterprise: user.enterprise
        }) : null
    }
}