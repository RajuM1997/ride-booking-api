"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_controller_1 = require("./admin.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const router = (0, express_1.Router)();
router.patch("/accept-driver-role/:id", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.acceptDriver);
router.patch("/remove-driver-role/:id", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.removeDriverRole);
router.patch("/suspend-driver/:id", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.suspendDriver);
router.patch("/update-user-activity/:id", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.blockUnblockUser);
router.get("/all-rides", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.getAllRides);
router.get("/all-users", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.getAllUsers);
router.get("/all-drivers", (0, checkAuth_1.checkAuth)("ADMIN"), admin_controller_1.adminController.getAllDrivers);
exports.adminRoutes = router;
//# sourceMappingURL=admin.route.js.map