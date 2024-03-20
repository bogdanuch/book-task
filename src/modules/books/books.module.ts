import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Author, Book, BookAuthor, BookGenre, Genre, UserBook } from "./entities";
import { BooksService } from "./services";
import { BooksController } from "./controllers";

@Module({
  imports: [TypeOrmModule.forFeature([Book, Genre, BookGenre, UserBook, Author, BookAuthor])],
  providers: [BooksService],
  controllers: [BooksController],
  exports: [BooksService],
})
export class BooksModule {}
