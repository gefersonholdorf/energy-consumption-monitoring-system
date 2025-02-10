import { Router } from "express";
import { ConsumptionRepository } from "../repositories/consumption/consumption.repository";
import { prismaClient } from "../../prisma/client";
import { DeviceRepository } from "../repositories/device/device.repository";
import { CreateConsumptionService } from "../../usecase/services/consumption/create-consumption.service";
import { CreateConsumptionController } from "../controllers/consumption/create-consumption.controller";
import { FindByDeviceConsumptionService } from "../../usecase/services/consumption/find-by-device.service";
import { FindByDeviceConsumptioController } from "../controllers/consumption/find-by-device-consumption.controller";

export const consumptionRoutes = Router()

const consumptionRepository = ConsumptionRepository.build(prismaClient)
const deviceRepository = DeviceRepository.build(prismaClient)

const createConsumptionService = CreateConsumptionService.build(consumptionRepository, deviceRepository)
const findByDeviceConsumptionService = FindByDeviceConsumptionService.build(consumptionRepository, deviceRepository)

const createConsumptionController = CreateConsumptionController.build(createConsumptionService)
const findByDeviceConsumptioController = FindByDeviceConsumptioController.build(findByDeviceConsumptionService)

consumptionRoutes.post('/devices/:id/consumption', (request, response, next) => createConsumptionController.handle(request, response, next))
consumptionRoutes.get('/devices/:id/consumption', (request, response, next) => findByDeviceConsumptioController.handle(request, response, next))