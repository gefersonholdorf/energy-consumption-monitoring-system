import { UserEntity, UserProps } from "../../../domains/user/entities/user.entity";
import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { UseCase } from "../../usecase";
const bcryptjs = require("bcryptjs")

export interface CreateUserInputDto extends UserProps{
}

export interface CreateUserOutputDto {
    id : number
    name : string
    email : string
    enterprise : string 
}

export class CreateUserService implements UseCase<CreateUserInputDto, CreateUserOutputDto> {

    private constructor(private readonly userRepository : UserRepository) {}

    static build(userRepository : UserRepository) {
        return new CreateUserService(userRepository)
    }

    async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
        const user = await this.userRepository.findByEmail(input.email)

        if (user) {
            throw new Error('User already exists in the system!')
        }

        const newPassword = await bcryptjs.hash(input.password, 10)

        const newUser : UserEntity = await UserEntity.build({
            name: input.name,
            email: input.email,
            password: newPassword,
            enterprise: input.enterprise
        })

        const getUser = await this.userRepository.create(newUser)

        return this.presentOutput(getUser)
    }

    private presentOutput(input : UserEntity) : CreateUserOutputDto {
        return {
            id: input.id,
            name: input.name,
            email: input.email,
            enterprise: input.enterprise 
        }
    }

}