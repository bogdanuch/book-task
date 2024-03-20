import { BaseEntity, Column, Entity, Index, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "../common";
import { Book } from "../../books/entities";

@Entity("users")
@Index(["email"], { unique: true })
@Index(["fullName"])
export class User extends BaseEntity {
  @ApiProperty({
    description: "User id",
    example: "12242",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "User email",
    example: "bogdan@gmail.com",
  })
  @Column()
  email: string;

  @Exclude()
  @Column({ nullable: true })
  password: string;

  @ApiProperty({
    description: "User role",
    example: UserRole.CLIENT,
  })
  @Column({
    name: "role",
    type: "enum",
    enum: UserRole,
  })
  role: UserRole;

  @ApiProperty({
    description: "User name",
    example: "Bohdan",
  })
  @Column({ name: "full_name", nullable: true })
  fullName: string;

  @ManyToMany(() => Book, (book) => book.favoriteBy)
  @JoinTable({
    name: "user_book",
    joinColumn: { name: "user_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "book_id", referencedColumnName: "id" },
  })
  favoriteBooks: Book[];
}
