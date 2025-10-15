"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.IPaymentMethod = exports.Role = void 0;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role["RIDER"] = "RIDER";
    Role["DRIVER"] = "DRIVER";
})(Role || (exports.Role = Role = {}));
var IPaymentMethod;
(function (IPaymentMethod) {
    IPaymentMethod["CASH"] = "CASH";
    IPaymentMethod["CARD"] = "CARD";
    IPaymentMethod["WALLET"] = "WALLET";
})(IPaymentMethod || (exports.IPaymentMethod = IPaymentMethod = {}));
var IsActive;
(function (IsActive) {
    IsActive["ACTIVE"] = "ACTIVE";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
//# sourceMappingURL=user.interface.js.map