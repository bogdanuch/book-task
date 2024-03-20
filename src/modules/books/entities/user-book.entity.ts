import { BaseEntity, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Book } from "./books.entity";
import { User } from "../../users/entities";

@Entity("user_book")
export class UserBook extends BaseEntity {
  @PrimaryColumn({ name: "user_id" })
  userId: string;

  @ManyToOne(() => User, (user) => user.favoriteBooks, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: User;

  @PrimaryColumn({ name: "book_id" })
  bookId: string;

  @ManyToOne(() => Book, (book) => book.favoriteBy, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "book_id", referencedColumnName: "id" }])
  book: Book;
}
