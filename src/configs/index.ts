import { config as dotEnvConfig } from "dotenv";

dotEnvConfig();
export const config = {
  app: {
    PORT: process.env.PORT || 5007,
    EMAIL_SERVICE_KEY: process.env.EMAIL_SERVICE_KEY || "",
    SALT_ROUNDS: process.env.SALT_ROUNDS || 10,
    EXPIRY_DAYS: process.env.EXPIRY_DAYS || 7,
  },
  jwt: {
    TOKEN_EXPIRY: process.env.TOKEN_EXPIRY || 3600,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",
  },
  db: {
    MONGO_URI: process.env.MONGO_URI || "",
    DB_NAME: process.env.DB_NAME || "",
  },
  serviceURIs: {
    MESSAGE_SERVICE: process.env.MESSAGE_SERVICE_URI || "",
  },
};
