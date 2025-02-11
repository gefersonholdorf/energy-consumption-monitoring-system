import { z } from "zod";

export const createDeviceSchema = z.object({
    name: z.string().min(3).max(40),
    serialNumber: z.string().min(3).max(40),
    model: z.string().min(3).max(40),
    location: z.string().min(3).max(40),
    userId: z.number()
})