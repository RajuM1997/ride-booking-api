import { Router } from "express";
import { adminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.patch(
  "/accept-driver-role/:id",
  checkAuth("ADMIN"),
  adminController.acceptDriver
);
router.patch(
  "/remove-driver-role/:id",
  checkAuth("ADMIN"),
  adminController.removeDriverRole
);
router.patch(
  "/suspend-driver/:id",
  checkAuth("ADMIN"),
  adminController.suspendDriver
);
router.patch(
  "/update-user-activity/:id",
  checkAuth("ADMIN"),
  adminController.blockUnblockUser
);
router.get("/all-rides", checkAuth("ADMIN"), adminController.getAllRides);
router.get("/all-users", checkAuth("ADMIN"), adminController.getAllUsers);
router.get("/all-drivers", checkAuth("ADMIN"), adminController.getAllDrivers);

export const adminRoutes = router;
