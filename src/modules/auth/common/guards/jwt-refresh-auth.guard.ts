import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenStrategies as StrategyName } from "../../../../config/strategies";

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(StrategyName.JWT_REFRESH_STRATEGY) {
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
