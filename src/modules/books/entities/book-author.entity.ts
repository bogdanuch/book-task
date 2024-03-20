import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./books.entity";
import { Genre } from "./genre.entity";
import { Author } from "./author.entity";

@Entity("book_author")
export class BookAuthor extends BaseEntity {
  @PrimaryColumn({ name: "book_id" })
  bookId: string;

  @ManyToOne(() => Book, (book) => book.authors, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;

  @PrimaryColumn({ name: "author_id" })
  authorId: string;

  @ManyToOne(() => Author, (author) => author.books, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "author_id", referencedColumnName: "id" }])
  author: Author;
}
