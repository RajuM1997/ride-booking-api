import { Router } from "express";
import { userRouter } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { rideRouter } from "../modules/ride/ride.route";
import { driverRouter } from "../modules/driver/driver.route";
import { adminRoutes } from "../modules/admin/admin.route";

export const router = Router();

const modulesRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/rides",
    route: rideRouter,
  },
  {
    path: "/drivers",
    route: driverRouter,
  },
  {
    path: "/site-admin",
    route: adminRoutes,
  },
];

modulesRoutes.forEach((route) => {
  router.use(route.path, route.route);
});
