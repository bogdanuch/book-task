import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateGenreDto {
  @ApiProperty({
    description: "Genre's title",
    example: "Fantasy",
  })
  @IsString()
  title: string;
}
