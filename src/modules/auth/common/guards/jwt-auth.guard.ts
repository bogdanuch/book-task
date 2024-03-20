import { ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { TokenStrategies as StrategyName } from "../../../../config/strategies";

export class JwtAuthGuard extends AuthGuard(StrategyName.JWT_STRATEGY) {
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
