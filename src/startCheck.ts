import { ConsumptionRepository } from "./infra/repositories/consumption/consumption.repository";
import { DeviceRepository } from "./infra/repositories/device/device.repository";
import { prismaClient } from "./prisma/client";
import { CheckConsumption } from "./utils/check-consumption";

const deviceRepository = DeviceRepository.build(prismaClient)
const consumptionRepository = ConsumptionRepository.build(prismaClient)

export const checkConsumption = CheckConsumption.build(consumptionRepository, deviceRepository)