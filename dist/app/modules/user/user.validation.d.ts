import z from "zod";
export declare const createUserZodSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodString>;
    driver: z.ZodOptional<z.ZodObject<{
        licenseNumber: z.ZodString;
        vehicleType: z.ZodString;
        vehicleNumber: z.ZodString;
        rating: z.ZodOptional<z.ZodNumber>;
        completedRides: z.ZodOptional<z.ZodNumber>;
        isAvailability: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        driverStatus: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        totalEarning: z.ZodOptional<z.ZodNumber>;
        rideCapability: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    rider: z.ZodOptional<z.ZodObject<{
        paymentMethod: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        rideHistory: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const updateUserZodSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isDeleted: z.ZodOptional<z.ZodBoolean>;
    isActive: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    isVerified: z.ZodOptional<z.ZodBoolean>;
    address: z.ZodOptional<z.ZodString>;
    driver: z.ZodOptional<z.ZodObject<{
        licenseNumber: z.ZodOptional<z.ZodString>;
        vehicleType: z.ZodOptional<z.ZodString>;
        vehicleNumber: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodNumber>;
        completedRides: z.ZodOptional<z.ZodNumber>;
        isAvailability: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        driverStatus: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        totalEarning: z.ZodOptional<z.ZodNumber>;
        rideCapability: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strip>>;
    rider: z.ZodOptional<z.ZodObject<{
        paymentMethod: z.ZodOptional<z.ZodEnum<{
            [x: string]: string;
        }>>;
        rideHistory: z.ZodOptional<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=user.validation.d.ts.map