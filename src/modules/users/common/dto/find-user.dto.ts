import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindUserDto {
  @ApiProperty({
    description: "User's fullName",
    example: "Bohdan Somebody",
  })
  @IsString()
  email: string;
}
