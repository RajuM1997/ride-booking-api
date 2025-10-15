"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rideRouter = void 0;
const express_1 = __importDefault(require("express"));
const ride_controller_1 = require("./ride.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const ride_validation_1 = require("./ride.validation");
const router = express_1.default.Router();
router.patch("/cancel-ride/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), ride_controller_1.rideController.cancelRide);
router.post("/request", (0, validateRequest_1.validateRequest)(ride_validation_1.requestRideZodSchema), (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), ride_controller_1.rideController.requestRide);
router.get("/my-rides", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), ride_controller_1.rideController.myAllRides);
exports.rideRouter = router;
//# sourceMappingURL=ride.route.js.map