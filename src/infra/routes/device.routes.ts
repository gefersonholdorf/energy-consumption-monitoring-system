import { Router } from "express";
import { UserRepository } from "../repositories/user/user.repository";
import { prismaClient } from "../../prisma/client";
import { CreateDeviceService } from "../../usecase/services/device/create-device.service";
import { DeviceRepository } from "../repositories/device/device.repository";
import { CreateDeviceController } from "../controllers/device/create-device.controller";
import { authenticate } from "../../middlewares/authenticate";
import { FindByIdDeviceService } from "../../usecase/services/device/find-id-device.service";
import { FindByIdDeviceController } from "../controllers/device/find-id-device.controller";

export const deviceRoutes = Router()

const userRepository = UserRepository.build(prismaClient)
const deviceRepository = DeviceRepository.build(prismaClient)

const createDeviceService = CreateDeviceService.build(deviceRepository, userRepository)
const findByIdDerviceService = FindByIdDeviceService.build(deviceRepository, userRepository)

const createDeviceController = CreateDeviceController.build(createDeviceService)
const findByIdDeviceController = FindByIdDeviceController.build(findByIdDerviceService)

deviceRoutes.post('/devices/create', authenticate, (request, response, next) => createDeviceController.handle(request, response, next))
deviceRoutes.get('/devices/:id', authenticate, (request, response, next) => findByIdDeviceController.handle(request, response, next))