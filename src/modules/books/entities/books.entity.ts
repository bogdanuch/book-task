import { BaseEntity, Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities";
import { Genre } from "./genre.entity";
import { Author } from "./author.entity";

@Entity("books")
@Index(["title"], { unique: true })
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "title", nullable: true })
  title: string;

  @ManyToMany(() => User, (user) => user.favoriteBooks)
  favoriteBy: User[];

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable({
    name: "book_genre",
    joinColumn: { name: "book_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "genre_id", referencedColumnName: "id" },
  })
  genres: Genre[];

  @ManyToMany(() => Author, (author) => author.books)
  @JoinTable({
    name: "book_author",
    joinColumn: { name: "book_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "author_id", referencedColumnName: "id" },
  })
  authors: Author[];
}
