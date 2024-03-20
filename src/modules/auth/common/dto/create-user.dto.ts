import { IsEmail, IsEnum, IsString } from "class-validator";
import { UserRole } from "../../../users/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: "Your email that will receive verification code",
    example: "bogdan@gmail.com",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Full name of user",
    example: "Bohdan Bohdanio",
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: "Password from your account",
    example: "12345",
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "Role of the created user",
    enum: UserRole,
    example: UserRole.CLIENT,
  })
  @IsEnum(UserRole)
  role: UserRole;
}
