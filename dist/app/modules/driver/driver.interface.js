"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRideStatus = exports.IsAvailability = exports.DriverStatus = void 0;
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["APPROVE"] = "APPROVE";
    DriverStatus["SUSPEND"] = "SUSPEND";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
var IsAvailability;
(function (IsAvailability) {
    IsAvailability["ONLINE"] = "ONLINE";
    IsAvailability["OFFLINE"] = "OFFLINE";
})(IsAvailability || (exports.IsAvailability = IsAvailability = {}));
var DriverRideStatus;
(function (DriverRideStatus) {
    DriverRideStatus["ACCEPT"] = "ACCEPT";
    DriverRideStatus["REJECT"] = "REJECT";
})(DriverRideStatus || (exports.DriverRideStatus = DriverRideStatus = {}));
//# sourceMappingURL=driver.interface.js.map