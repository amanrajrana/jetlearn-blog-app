import { config as dotenv } from "dotenv";

dotenv();

const _config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,

  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};

const config = {
  get: (key: keyof typeof _config) => {
    const value = _config[key];
    if (!value) {
      console.error(`Config key ${key} not found`);
      process.exit(1);
    }
    return value;
  },
};

export default config;
