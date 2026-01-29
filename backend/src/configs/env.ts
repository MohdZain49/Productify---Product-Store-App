import dotenv from "dotenv";

dotenv.config({
  quiet: true,
});

const _env = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  FRONTEND_URL: process.env.FRONTEND_URL,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_SECRET_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};


export const ENV = Object.freeze(_env)