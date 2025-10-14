import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { driverControllers } from "./driver.controller";

const router = express.Router();

router.patch(
  "/approve/:id",
  checkAuth("DRIVER"),

  driverControllers.approveDriver
);
router.patch(
  "/:id/update-status",
  checkAuth("DRIVER"),
  driverControllers.updateRideStatus
);
router.patch(
  "/update-driver-availability",
  checkAuth("DRIVER"),
  driverControllers.updateDriverAvailability
);
router.patch(
  "/rides/cancel-ride/:id",
  checkAuth("DRIVER"),
  driverControllers.cancelRideDriver
);
router.get(
  "/driver-earning",
  checkAuth("DRIVER"),
  driverControllers.totalCompleteRideAndEarning
);

export const driverRouter = router;
