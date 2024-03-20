import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class VerifyEmailDto {
  @ApiProperty({
    description: "6 digit code that you've got on your email address",
    example: "123456",
  })
  @IsString()
  verificationCode: string;
}
