"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const env_1 = require("./env");
const user_model_1 = require("../modules/user/user.model");
const user_interface_1 = require("../modules/user/user.interface");
const passport_local_1 = require("passport-local");
passport_1.default.use(new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, async (email, password, done) => {
    try {
        const isUserExist = await user_model_1.User.findOne({ email });
        if (!isUserExist) {
            return done(null, false, { message: "User does not exist" });
        }
        //   const isGoogleAuthenticated = isUserExist?.auth?.some(providerObject => providerObject.provider == "google");
        //   if (isGoogleAuthenticated && !isUserExist.password) {
        //       return done(null, false, {
        //         message:
        //           "You have authenticated through google. So want to login with credentials, then at first login with google and set a password your Gmail and then you can login with email and password",
        //       });
        //   }
        const isPasswordMatched = await bcryptjs_1.default.compare(password, isUserExist?.password);
        if (!isPasswordMatched) {
            return done(null, false, { message: "Incorrect Password" });
        }
        return done(null, isUserExist);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: env_1.envVars.GOOGLE_CLIENT_ID,
    clientSecret: env_1.envVars.GOOGLE_CLIENT_SECRET,
    callbackURL: env_1.envVars.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const email = profile.emails?.[0]?.value;
        if (!email) {
            return done(null, false, { message: "No email found" });
        }
        let user = await user_model_1.User.findOne({ email });
        if (!user) {
            user = await user_model_1.User.create({
                email,
                name: profile.displayName,
                picture: profile.photos?.[0]?.value,
                role: user_interface_1.Role.RIDER,
                isVerified: true,
            });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user._id);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await user_model_1.User.findById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
//# sourceMappingURL=passport.js.map