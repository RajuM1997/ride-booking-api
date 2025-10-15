interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production";
    JWT_ACCESS_SECRET: string;
    JWT_ACCESS_EXPIRES: string;
    JWT_REFRESH_SECRET: string;
    JWT_REFRESH_EXPIRES: string;
    BCRYPT_SALT_ROUND: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
    EXPRESS_SESSION: string;
    FRONTEND_URL: string;
}
export declare const envVars: EnvConfig;
export {};
//# sourceMappingURL=env.d.ts.map