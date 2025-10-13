/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import { TGenericErrorSources } from "../interfaces/error.types";

export const handleCastError = (
  err: mongoose.Error.CastError
): TGenericErrorSources => {
  return {
    statusCode: 400,
    message: "Invalid MongoDB ObjectID. Please provide valid ID",
  };
};
