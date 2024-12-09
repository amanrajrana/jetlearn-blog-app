import { config as dotenv } from "dotenv";

dotenv();

const _config = {
  port: process.env.PORT,
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
