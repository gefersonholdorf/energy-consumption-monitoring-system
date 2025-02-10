import { Router } from "express";
import { UserRepository } from "../repositories/user/user.repository";
import { prismaClient } from "../../prisma/client";
import { CreateDeviceService } from "../../usecase/services/device/create-device.service";
import { DeviceRepository } from "../repositories/device/device.repository";
import { CreateDeviceController } from "../controllers/device/create-device.controller";
import { authenticate } from "../../middlewares/authenticate";

export const deviceRoutes = Router()

const userRepository = UserRepository.build(prismaClient)
const deviceRepository = DeviceRepository.build(prismaClient)

const createDeviceService = CreateDeviceService.build(deviceRepository, userRepository)

const createDeviceController = CreateDeviceController.build(createDeviceService)

deviceRoutes.post('/create-device', authenticate, (request, response, next) => createDeviceController.handle(request, response, next))