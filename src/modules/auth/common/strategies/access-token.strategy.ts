import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { TokenStrategies as StrategyName } from "../../../../config/strategies";
import { JwtPayload } from "../interfaces";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, StrategyName.JWT_STRATEGY) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies?.["accessToken"],
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
    });
  }

  validate(payload: JwtPayload) {
    return {
      id: payload.id,
      role: payload.role,
      email: payload.email,
    };
  }
}
