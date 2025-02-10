import { Router } from "express";
import { UserRepository } from "../repositories/user/user.repository";
import { prismaClient } from "../../prisma/client";
import { AuthenticateService } from "../../usecase/services/auth/authenticate.service";
import { AuthenticateController } from "../controllers/auth/authenticate.controller";

export const authRoutes = Router()

const userRepository = UserRepository.build(prismaClient)

const authService = AuthenticateService.build(userRepository)

const authController = AuthenticateController.build(authService)

authRoutes.post('/auth/login', (request, response, next) => authController.handle(request, response, next))