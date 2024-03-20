import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

/** Interceptor to update refresh and access token in cookies */
@Injectable()
export class TokensInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const res = context.switchToHttp().getResponse();
        const isDebug = this.configService.get("LOG_LEVEL") === "debug";

        if (data?.accessToken) {
          res.cookie("accessToken", data.accessToken, {
            sameSite: isDebug ? "none" : "lax",
            secure: isDebug,
            maxAge: Number(this.configService.get("JWT_ACCESS_TOKEN_EXPIRATION_TIME")) * 1000,
          });
        }

        if (data?.refreshToken) {
          res.cookie("refreshToken", data.refreshToken, {
            sameSite: isDebug ? "none" : "lax",
            secure: isDebug,
            maxAge: Number(this.configService.get("JWT_REFRESH_TOKEN_EXPIRATION_TIME")) * 1000,
          });
        }

        return {
          accessToken: data?.accessToken,
          refreshToken: data?.refreshToken,
        };
      }),
    );
  }
}
