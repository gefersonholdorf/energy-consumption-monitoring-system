import { DeviceEntity } from "../src/domains/device/entities/device.entity";
import { DeviceRepository } from "../src/infra/repositories/device/device.repository";
import { prismaClient } from "../src/prisma/client";
import { startSimulator } from "./consumption-simulator";

const deviceRepository = DeviceRepository.build(prismaClient)

export async function startSimulatorMain() {
    const devices: DeviceEntity[] = await deviceRepository.findAll();
    startSimulator(devices);
}