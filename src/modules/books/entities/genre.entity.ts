import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./books.entity";

@Entity("genres")
@Index(["title"], { unique: true })
export class Genre extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "title", nullable: true })
  title: string;

  @ManyToMany(() => Book, (book) => book.genres)
  books: Book[];
}
