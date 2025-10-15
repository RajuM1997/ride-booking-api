"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideServer = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const ride_interface_1 = require("./ride.interface");
const ride_model_1 = require("./ride.model");
const mongoose_1 = __importStar(require("mongoose"));
const requestRide = async (payload, decodedToken) => {
    if (!decodedToken.userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User Not Found");
    }
    const ride = await ride_model_1.Ride.create({ ...payload, rider: decodedToken.userId });
    return ride;
};
const cancelRide = async (rideId, decodedToken) => {
    if (!decodedToken.userId) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
    }
    const ride = await ride_model_1.Ride.findById(rideId);
    const userId = new mongoose_1.default.Types.ObjectId(decodedToken.userId);
    if (!ride?.rider?.equals(userId)) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "You are not abel to cancel this rides");
    }
    if (ride?.status === ride_interface_1.IRideStatus.ACCEPTED ||
        ride?.status === ride_interface_1.IRideStatus.PICKED_UP ||
        ride?.status === ride_interface_1.IRideStatus.IN_TRANSIT ||
        ride?.status === ride_interface_1.IRideStatus.COMPLETE) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You can not cancel this ride");
    }
    await ride_model_1.Ride.findByIdAndUpdate(rideId, {
        status: ride_interface_1.IRideStatus.CANCELLED,
    });
};
const myAllRides = async (decodedToken) => {
    const rides = await ride_model_1.Ride.aggregate([
        {
            $match: {
                rider: new mongoose_1.Types.ObjectId(decodedToken.userId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "driver",
                foreignField: "_id",
                as: "driver",
            },
        },
        {
            $unwind: {
                path: "$driver",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                pickup: 1,
                destination: 1,
                status: 1,
                fare: 1,
                "driver.name": 1,
                "driver.phone": 1,
            },
        },
    ]);
    if (!rides) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "No ride found");
    }
    return rides;
};
exports.rideServer = {
    requestRide,
    cancelRide,
    myAllRides,
};
//# sourceMappingURL=ride.service.js.map