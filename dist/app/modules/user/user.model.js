"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const driver_interface_1 = require("../driver/driver.interface");
const driverSchema = new mongoose_1.Schema({
    licenseNumber: {
        type: String,
        required: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleNumber: {
        type: String,
        required: true,
    },
    completedRides: {
        type: Number,
        required: true,
        default: 0,
    },
    rideCapability: {
        type: Boolean,
        default: true,
    },
    isAvailability: {
        type: String,
        enum: driver_interface_1.IsAvailability,
        default: driver_interface_1.IsAvailability.ONLINE,
    },
    driverStatus: {
        type: String,
        enum: driver_interface_1.DriverStatus,
    },
    totalEarning: {
        type: Number,
        default: 0,
    },
}, { versionKey: false, _id: false });
const riderSchema = new mongoose_1.Schema({
    paymentMethod: {
        type: String,
        enum: Object.values(user_interface_1.IPaymentMethod),
        default: user_interface_1.IPaymentMethod.CASH,
    },
    rideHistory: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Ride",
        },
    ],
}, { versionKey: false, _id: false });
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(user_interface_1.Role),
        default: user_interface_1.Role.RIDER,
    },
    phone: {
        type: String,
    },
    picture: {
        type: String,
    },
    address: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    driver: {
        type: driverSchema,
    },
    rider: {
        type: riderSchema,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map