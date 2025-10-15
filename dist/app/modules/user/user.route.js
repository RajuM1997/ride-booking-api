"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("./user.interface");
const validateRequest_1 = require("../../middlewares/validateRequest");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.validateRequest)(user_validation_1.createUserZodSchema), user_controller_1.userController.createUser);
router.patch("/:id", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), (0, validateRequest_1.validateRequest)(user_validation_1.updateUserZodSchema), user_controller_1.userController.updateUser);
router.get("/me", (0, checkAuth_1.checkAuth)(...Object.values(user_interface_1.Role)), user_controller_1.userController.getMe);
exports.userRouter = router;
//# sourceMappingURL=user.route.js.map