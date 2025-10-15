"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverService = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const ride_model_1 = require("../ride/ride.model");
const ride_interface_1 = require("../ride/ride.interface");
const user_model_1 = require("../user/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = require("../../utils/QueryBuilder");
const driver_interface_1 = require("./driver.interface");
const approveDriver = async (rideId, decodedToken) => {
    const existingUser = await user_model_1.User.findById(decodedToken.userId);
    if (!existingUser) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    if (existingUser.role !== "DRIVER") {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not able to view this route");
    }
    if (!existingUser.driver) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Please complete your profile");
    }
    const ride = await ride_model_1.Ride.findById(rideId);
    if (ride?.status !== ride_interface_1.IRideStatus.REQUESTED) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "This ride already booked please try another one");
    }
    const updateRide = await ride_model_1.Ride.findByIdAndUpdate(rideId, {
        status: ride_interface_1.IRideStatus.ACCEPTED,
        driver: decodedToken.userId,
        driverRideStatus: driver_interface_1.DriverRideStatus.ACCEPT,
    });
    const newDriverData = existingUser.driver;
    newDriverData.rideCapability = false;
    await user_model_1.User.findByIdAndUpdate(decodedToken.userId, {
        driver: newDriverData,
    });
    return updateRide;
};
const updateRideStatus = async (rideId, decodedToken, payload) => {
    const ride = await ride_model_1.Ride.findById(rideId);
    if (!ride) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Ride not found");
    }
    const userId = new mongoose_1.default.Types.ObjectId(decodedToken.userId);
    if (!ride?.driver?.equals(userId)) {
        throw new AppError_1.default(http_status_codes_1.default.UNAUTHORIZED, "Yor are not able to updated status");
    }
    if (ride.status === ride_interface_1.IRideStatus.COMPLETE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You can not change status because this ride already complete");
    }
    if (payload.status === ride_interface_1.IRideStatus.COMPLETE) {
        await user_model_1.User.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(decodedToken.userId), {
            $inc: {
                "driver.completedRides": 1,
                "driver.totalEarning": ride.fare,
            },
            $set: {
                "driver.rideCapability": true,
            },
        }, { new: true, runValidators: true });
    }
    await ride_model_1.Ride.findByIdAndUpdate(rideId, {
        status: payload.status,
        currentStatus: [
            {
                status: payload.status,
            },
        ],
    }, { new: true, runValidators: true });
};
const cancelRideDriver = async (rideId, decodedToken) => {
    if (!decodedToken.userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const ride = await ride_model_1.Ride.findById(rideId);
    const userId = new mongoose_1.default.Types.ObjectId(decodedToken.userId);
    if (!ride?.rider?.equals(userId)) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "You are not abel to cancel this rides");
    }
    await ride_model_1.Ride.findByIdAndUpdate(rideId, {
        driverRideStatus: driver_interface_1.DriverRideStatus.REJECT,
    });
};
const updateDriverAvailability = async (decodedToken, availabilityStatus) => {
    const user = await user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    await user_model_1.User.findByIdAndUpdate(decodedToken.userId, {
        "driver.isAvailability": availabilityStatus,
    }, { new: true, runValidators: true });
};
const getMyRides = async (query) => {
    const queryBuilder = new QueryBuilder_1.QueryBuilder(ride_model_1.Ride.find(), query);
    const rides = queryBuilder.filter().sort().paginate();
    const [data, meta] = await Promise.all([
        rides.build(),
        queryBuilder.getMeta(),
    ]);
    return { data, meta };
};
const totalCompleteRideAndEarning = async (decodedToken) => {
    const user = await user_model_1.User.findById(decodedToken.userId);
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const driverInfo = {};
    driverInfo.totalCompleteRides = user.driver?.completedRides;
    driverInfo.totalAmount = user.driver?.totalEarning;
    return {
        driverInfo,
    };
};
exports.driverService = {
    approveDriver,
    updateRideStatus,
    getMyRides,
    totalCompleteRideAndEarning,
    updateDriverAvailability,
    cancelRideDriver,
};
//# sourceMappingURL=driver.service.js.map