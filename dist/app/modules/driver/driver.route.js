"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.driverRouter = void 0;
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const driver_controller_1 = require("./driver.controller");
const router = express_1.default.Router();
router.patch("/approve/:id", (0, checkAuth_1.checkAuth)("DRIVER"), driver_controller_1.driverControllers.approveDriver);
router.patch("/:id/update-status", (0, checkAuth_1.checkAuth)("DRIVER"), driver_controller_1.driverControllers.updateRideStatus);
router.patch("/update-driver-availability", (0, checkAuth_1.checkAuth)("DRIVER"), driver_controller_1.driverControllers.updateDriverAvailability);
router.patch("/rides/cancel-ride/:id", (0, checkAuth_1.checkAuth)("DRIVER"), driver_controller_1.driverControllers.cancelRideDriver);
router.get("/driver-earning", (0, checkAuth_1.checkAuth)("DRIVER"), driver_controller_1.driverControllers.totalCompleteRideAndEarning);
exports.driverRouter = router;
//# sourceMappingURL=driver.route.js.map