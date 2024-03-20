import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthorDto {
  @ApiProperty({
    description: "Author's full name",
    example: "Tom Hangry",
  })
  @IsString()
  fullName: string;
}
