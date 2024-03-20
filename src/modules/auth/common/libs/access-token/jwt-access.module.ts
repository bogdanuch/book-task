import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { JwtAccessService } from "./jwt-access.service";

@Module({
  imports: [JwtModule],
  providers: [JwtAccessService],
  exports: [JwtAccessService],
})
export class JwtAccessModule {}
