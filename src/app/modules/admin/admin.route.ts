import { Router } from "express";
import { adminController } from "./admin.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.patch(
  "/drivers/accept-driver-role/:id",
  checkAuth("ADMIN"),
  adminController.acceptDriver
);
router.patch(
  "/drivers/remove-driver-role/:id",
  checkAuth("ADMIN"),
  adminController.removeDriverRole
);
router.patch(
  "/drivers/suspend-driver/:id",
  checkAuth("ADMIN"),
  adminController.suspendDriver
);
router.patch(
  "/user/update-user-activity/:id",
  checkAuth("ADMIN"),
  adminController.blockUnblockUser
);
router.get("/rides/all-rides", checkAuth("ADMIN"), adminController.getAllRides);
router.get("/user/all-users", checkAuth("ADMIN"), adminController.getAllUsers);

export const adminRoutes = router;
