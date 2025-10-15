"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./app/config/env");
let server;
const url = env_1.envVars.DB_URL;
const PORT = env_1.envVars.PORT;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(url);
        console.log("Connected to DB");
        server = app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
startServer();
process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
// this code run when we shop our server
process.on("SIGINT", () => {
    console.log("SIGTERM signal received... Server shutting down..");
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on("uncaughtException", (err) => {
    console.log("unhandled rejection detected... Server shutting down..", err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
//# sourceMappingURL=server.js.map