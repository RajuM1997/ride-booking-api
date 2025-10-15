import z from "zod";
export declare const requestRideZodSchema: z.ZodObject<{
    rider: z.ZodOptional<z.ZodString>;
    driver: z.ZodOptional<z.ZodString>;
    pickup: z.ZodString;
    destination: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    fare: z.ZodCoercedNumber<unknown>;
    driverRideStatus: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    currentStatus: z.ZodOptional<z.ZodArray<z.ZodObject<{
        status: z.ZodString;
        currentTimeTamp: z.ZodOptional<z.ZodDate>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const updateRideZodSchema: z.ZodObject<{
    rider: z.ZodOptional<z.ZodString>;
    driver: z.ZodOptional<z.ZodString>;
    pickup: z.ZodOptional<z.ZodString>;
    destination: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    fare: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    driverRideStatus: z.ZodOptional<z.ZodEnum<{
        [x: string]: string;
    }>>;
    currentStatus: z.ZodOptional<z.ZodArray<z.ZodObject<{
        status: z.ZodString;
        currentTimeTamp: z.ZodOptional<z.ZodDate>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
//# sourceMappingURL=ride.validation.d.ts.map