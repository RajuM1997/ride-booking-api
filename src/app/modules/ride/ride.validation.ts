import z from "zod";
import { IRideStatus } from "./ride.interface";
import { DriverRideStatus } from "../driver/driver.interface";

export const requestRideZodSchema = z.object({
  rider: z.string().optional(),
  driver: z.string().optional(),
  pickup: z
    .string("Pickup must be string")
    .min(2, { message: "Pickup must be at least 5 characters long. " })
    .max(50, { message: "Pickup cannot exceed 100 characters." }),
  destination: z
    .string({ message: "Destination must be  string" })
    .min(5, { message: "Destination must be at least 5 characters long." })
    .max(100, { message: "Destination cannot exceed 100 characters." }),
  status: z.enum(Object.values(IRideStatus) as [string]).optional(),
  fare: z.coerce.number({ message: "Fire must be  number" }),
  driverRideStatus: z
    .enum(Object.values(DriverRideStatus) as [string])
    .optional(),
  currentStatus: z
    .array(
      z.object({
        status: z.string(),
        currentTimeTamp: z.date().optional(),
      })
    )
    .optional(),
});

export const updateRideZodSchema = z.object({
  rider: z.string().optional(),
  driver: z.string().optional(),
  pickup: z
    .string("Pickup must be string")
    .min(2, { message: "Pickup must be at least 5 characters long. " })
    .max(50, { message: "Pickup cannot exceed 100 characters." })
    .optional(),
  destination: z
    .string({ message: "Destination must be  string" })
    .min(5, { message: "Destination must be at least 5 characters long." })
    .max(100, { message: "Destination cannot exceed 100 characters." }),
  status: z.enum(Object.values(IRideStatus) as [string]).optional(),
  fare: z.coerce.number({ message: "Fire must be  number" }).optional(),
  driverRideStatus: z
    .enum(Object.values(DriverRideStatus) as [string])
    .optional(),
  currentStatus: z
    .array(
      z.object({
        status: z.string(),
        currentTimeTamp: z.date().optional(),
      })
    )
    .optional(),
});
