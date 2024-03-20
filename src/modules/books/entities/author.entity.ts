import { BaseEntity, Column, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./books.entity";

@Entity("authors")
@Index(["fullName"], { unique: true })
export class Author extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "full_name", nullable: true })
  fullName: string;

  @ManyToMany(() => Book, (book) => book.authors)
  books: Book[];
}
