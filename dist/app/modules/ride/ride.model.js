"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = require("mongoose");
const ride_interface_1 = require("./ride.interface");
const driver_interface_1 = require("../driver/driver.interface");
const currentStatusSchema = new mongoose_1.Schema({
    status: {
        type: String,
        required: true,
    },
    currentTimeTamp: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false,
    _id: false,
});
const rideSchema = new mongoose_1.Schema({
    rider: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    driver: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    pickup: {
        type: String,
    },
    destination: {
        type: String,
    },
    status: {
        type: String,
        enum: Object.values(ride_interface_1.IRideStatus),
        default: ride_interface_1.IRideStatus.REQUESTED,
    },
    fare: {
        type: Number,
    },
    driverRideStatus: {
        type: String,
        enum: driver_interface_1.DriverRideStatus,
    },
    currentStatus: [currentStatusSchema],
}, { timestamps: true });
exports.Ride = (0, mongoose_1.model)("ride", rideSchema);
//# sourceMappingURL=ride.model.js.map