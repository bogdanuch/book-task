import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindBookDto {
  @ApiProperty({
    description: "Book's title",
    example: "Lord of the rings",
  })
  @IsString()
  title: string;
}
