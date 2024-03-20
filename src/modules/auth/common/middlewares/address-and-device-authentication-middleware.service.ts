import { Request, Response } from "express";
import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";

/** Middleware to extract deviceId token from header */
@Injectable()
export class AddressAndDeviceAuthenticationMiddleware implements NestMiddleware {
  async use(req: Request | any, res: Response, next: () => void) {
    let clientIp = (req.headers["x-forwarded-for"] as string) || req.ip || req.connection.remoteAddress;
    const clientUserAgent = req.headers["user-agent"];

    if (clientIp.includes(",")) {
      clientIp = clientIp.split(",")[0].trim();
    }

    if (!clientUserAgent) {
      throw new ForbiddenException("Can't read user-agent header");
    }

    req.clientInfo = {
      IPAddress: clientIp,
      userAgent: clientUserAgent,
    };
    next();
  }
}
