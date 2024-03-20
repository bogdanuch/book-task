import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtRefreshService } from "./jwt-refresh.service";

@Module({
  imports: [JwtModule],
  providers: [JwtRefreshService],
  exports: [JwtRefreshService],
})
export class JwtRefreshModule {}
