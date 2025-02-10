import { UserRepository } from "../../../infra/repositories/user/user.repository"
import { UseCase } from "../../usecase"
const bcryptjs = require("bcryptjs")
import jwt from "jsonwebtoken"

export interface AuthenticateInputDto {
    email : string
    password : string
}

export interface AuthenticateOutputDto {
    token : string
}

export class AuthenticateService implements UseCase<AuthenticateInputDto, AuthenticateOutputDto> {

    private constructor(private readonly userRepository : UserRepository){}

    static build(userRepository : UserRepository) {
        return new AuthenticateService(userRepository)
    }

    async execute(input: AuthenticateInputDto): Promise<AuthenticateOutputDto> {
        
        const user = await this.userRepository.findByEmail(input.email)

        if(!user) {
            throw new Error('Invalid email or password!')
        }

        const verifyPassword = await bcryptjs.compare(input.password, user.password) 

        if (!verifyPassword) {
            throw new Error('Invalid email or password!')
        }

        const token = await jwt.sign(
            {
                userId: user.id,
                name: user.name
            }, 
            process.env.SECRET_KEY || "palavrasecreta", 
            {
                expiresIn: '12h'
            }
        )

        return {token}
    }

}