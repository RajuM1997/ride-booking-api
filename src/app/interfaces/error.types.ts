export interface TErrorSources {
  path: string;
  message: string;
}

export interface TGenericErrorSources {
  statusCode: number;
  message: string;
  errorSources?: TErrorSources[];
}
