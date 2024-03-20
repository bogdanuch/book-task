import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AccessTokenStrategy, RefreshTokenStrategy } from "./common/strategies";
import { JwtRefreshModule } from "./common/libs/refresh-token/jwt-refresh.module";
import { JwtAccessModule } from "./common/libs/access-token/jwt-access.module";
import { AddressAndDeviceAuthenticationMiddleware } from "./common/middlewares/address-and-device-authentication-middleware.service";
import { AuthController } from "./controllers";
import { AuthService } from "./services";
import { UsersModule } from "../users/users.module";

@Module({
  imports: [JwtRefreshModule, JwtAccessModule, UsersModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddressAndDeviceAuthenticationMiddleware).forRoutes(AuthController);
  }
}
