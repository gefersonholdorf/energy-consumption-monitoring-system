import { Router } from "express";
import { UserRepository } from "../repositories/user/user.repository";
import { prismaClient } from "../../prisma/client";
import { CreateUserService } from "../../usecase/services/user/create-user.service";
import { CreateUserController } from "../controllers/user/create-user.controller";

export const userRoutes = Router()

const userRepository = UserRepository.build(prismaClient)

const createUserService = CreateUserService.build(userRepository)

const createUserController = CreateUserController.build(createUserService)

userRoutes.post('/create-user', (request, response, next) => createUserController.handle(request, response, next))