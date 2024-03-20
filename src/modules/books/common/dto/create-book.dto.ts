import { IsString, IsArray, ArrayMinSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateBookDto {
  @ApiProperty({
    description: "Book's title",
    example: "Lord of the rings",
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: "Book's genres",
    example: ["8f4dbcc9-fff0-4fb3-bd99-ffb95f492893"],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  genreIds: string[];

  @ApiProperty({
    description: "Book's authors",
    example: ["8f4dbcc9-fff0-4fb3-bd99-ffdsaf492893"],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  authorIds: string[];
}
