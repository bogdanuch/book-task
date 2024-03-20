import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { RequestWithRefreshToken } from "../interfaces";
import { JwtPayload } from "../interfaces";
import { TokenStrategies as StrategyName } from "../../../../config/strategies";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, StrategyName.JWT_REFRESH_STRATEGY) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.["refreshToken"],
        (request: RequestWithRefreshToken) => request.body.refreshToken,
      ]),
      secretOrKey: process.env.JWT_REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: RequestWithRefreshToken, payload: JwtPayload) {
    return {
      id: payload.id,
      role: payload.role,
      email: payload.email,
    };
  }
}
