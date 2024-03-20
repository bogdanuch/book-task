import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FavoritesDto {
  @ApiProperty({
    description: "Book's id",
    example: "8f4dbcc9-fff0-4fb3-bd99-ffb95f492893",
  })
  @IsString()
  bookId: string;
}
