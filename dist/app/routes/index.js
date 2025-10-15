"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const auth_route_1 = require("../modules/auth/auth.route");
const ride_route_1 = require("../modules/ride/ride.route");
const driver_route_1 = require("../modules/driver/driver.route");
const admin_route_1 = require("../modules/admin/admin.route");
exports.router = (0, express_1.Router)();
const modulesRoutes = [
    {
        path: "/user",
        route: user_route_1.userRouter,
    },
    {
        path: "/auth",
        route: auth_route_1.authRoute,
    },
    {
        path: "/rides",
        route: ride_route_1.rideRouter,
    },
    {
        path: "/drivers",
        route: driver_route_1.driverRouter,
    },
    {
        path: "/site-admin",
        route: admin_route_1.adminRoutes,
    },
];
modulesRoutes.forEach((route) => {
    exports.router.use(route.path, route.route);
});
//# sourceMappingURL=index.js.map