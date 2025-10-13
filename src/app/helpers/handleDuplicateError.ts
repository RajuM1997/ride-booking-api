/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericErrorSources } from "../interfaces/error.types";

export const handleDuplicateError = (err: any): TGenericErrorSources => {
  const matchArray = err.message.match(/"([^"]*)"/);
  return {
    statusCode: 400,
    message: `${matchArray[1]} already exists!!`,
  };
};
