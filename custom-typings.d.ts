import { Request } from "express";
import { UserRole } from "./src/modules/users/common";

declare module "express" {
  export interface Request extends Request {
    clientInfo: {
      IPAddress: string;
      userAgent: string;
    };
    user: {
      id: string;
      role: UserRole;
      email: string;
      isOauth?: boolean;
      clientUserAgent: string;
      clientIPAddress: string;
    };
  }
}
