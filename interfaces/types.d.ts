import { Request } from "express";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT?: string;
      SECRET_KEY: string;
      LINK_SECRET_KEY: string;
      MONGODB_URL: string;
    }
  }
}

declare module "express-serve-static-core" {
  export interface Request {
    user_id?: string;
    wss?: Server;
  }
}
