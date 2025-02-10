import { z } from "zod";

export const createConsumptionSchema = z.object({
    powerUsage: z.number(),
    voltage: z.number(),
    current: z.number(),
    timestamp: z.string().datetime()
})
