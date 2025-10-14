import z from "zod";
import { IPaymentMethod, IsActive, Role } from "./user.interface";
import { DriverStatus, IsAvailability } from "../driver/driver.interface";

export const createUserZodSchema = z.object({
  name: z
    .string("Name must be string")
    .min(2, { message: "Name must be at least 2 characters long. " })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z
    .string({ message: "Email must be  string" })
    .email({ message: "Invalid email address format." })
    .min(5, { message: "Email must be at least 5 characters long." })
    .max(100, { message: "Email cannot exceed 100 characters." }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  phone: z
    .string()
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXXX"
    )
    .optional(),
  address: z
    .string({ message: "Address must be  string" })
    .max(200, { message: "Address cannot exceed 100 characters." })
    .optional(),
  driver: z
    .object({
      licenseNumber: z.string({ message: "license number must be  string" }),
      vehicleType: z.string({ message: "vehicle type must be  string" }),
      vehicleNumber: z.string({ message: "vehicle number must be  string" }),
      rating: z.number({ message: "rating must be  number" }).optional(),
      completedRides: z
        .number({ message: "completed rides must be number" })
        .optional(),
      isAvailability: z
        .enum(Object.values(IsAvailability) as [string])
        .optional(),
      driverStatus: z.enum(Object.values(DriverStatus) as [string]).optional(),
      totalEarning: z
        .number({ message: "total earning must be number" })
        .optional(),
      rideCapability: z
        .boolean({ message: "ride capability must be boolean" })
        .optional(),
    })
    .optional(),
  rider: z
    .object({
      paymentMethod: z
        .enum(Object.values(IPaymentMethod) as [string])
        .optional(),
      rideHistory: z.array(z.string()).optional(),
    })
    .optional(),
});

export const updateUserZodSchema = z.object({
  name: z
    .string({ message: "Name must be string" })
    .min(2, { message: "Name must be at least 2 characters long. " })
    .max(50, { message: "Name cannot exceed 50 characters." })
    .optional(),
  phone: z
    .string()
    .regex(
      /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/,
      "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXXX"
    )
    .optional(),
  role: z.enum(Object.values(Role) as [string]).optional(),
  isDeleted: z
    .boolean({ message: "isDeleted must be true or false" })
    .optional(),
  isActive: z.enum(Object.values(IsActive) as [string]).optional(),
  isVerified: z
    .boolean({ message: "isVerified must be true or false" })
    .optional(),
  address: z
    .string({ message: "Address must be  string" })
    .max(200, { message: "Address cannot exceed 100 characters." })
    .optional(),
  driver: z
    .object({
      licenseNumber: z
        .string({ message: "license number must be  string" })
        .optional(),
      vehicleType: z
        .string({ message: "vehicle type must be  string" })
        .optional(),
      vehicleNumber: z
        .string({ message: "vehicle number must be  string" })
        .optional(),
      rating: z.number({ message: "rating must be  number" }).optional(),
      completedRides: z
        .number({ message: "completed rides must be number" })
        .optional(),
      isAvailability: z
        .enum(Object.values(IsAvailability) as [string])
        .optional(),
      driverStatus: z.enum(Object.values(DriverStatus) as [string]).optional(),
      totalEarning: z
        .number({ message: "total earning must be number" })
        .optional(),
      rideCapability: z
        .boolean({ message: "ride capability must be boolean" })
        .optional(),
    })
    .optional(),
  rider: z
    .object({
      paymentMethod: z
        .enum(Object.values(IPaymentMethod) as [string])
        .optional(),
      rideHistory: z.array(z.string()).optional(),
    })
    .optional(),
});
