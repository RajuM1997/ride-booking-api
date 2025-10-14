import express from "express";
import { rideController } from "./ride.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { requestRideZodSchema } from "./ride.validation";

const router = express.Router();

router.patch(
  "/cancel-ride/:id",
  checkAuth(...Object.values(Role)),
  rideController.cancelRide
);

router.post(
  "/request",
  validateRequest(requestRideZodSchema),
  checkAuth(...Object.values(Role)),
  rideController.requestRide
);

router.get(
  "/my-rides",
  checkAuth(...Object.values(Role)),
  rideController.myAllRides
);

export const rideRouter = router;
