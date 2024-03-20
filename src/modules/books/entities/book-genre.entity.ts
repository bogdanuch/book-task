import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./books.entity";
import { Genre } from "./genre.entity";

@Entity("book_genre")
export class BookGenre extends BaseEntity {
  @PrimaryColumn({ name: "book_id" })
  bookId: string;

  @ManyToOne(() => Book, (book) => book.genres, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;

  @PrimaryColumn({ name: "genre_id" })
  genreId: string;

  @ManyToOne(() => Genre, (genre) => genre.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "genre_id", referencedColumnName: "id" }])
  genre: Genre;
}
