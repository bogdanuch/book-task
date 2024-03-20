import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({
    description: "Your email",
    example: "bogdan@gmail.com",
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: "Your password",
    example: "Anything",
  })
  @IsNotEmpty()
  password: string;
}
