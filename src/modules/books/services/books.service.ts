import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Author, Book, BookAuthor, BookGenre, Genre, UserBook } from "../entities";
import { CreateBookDto } from "../common/dto/create-book.dto";

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(BookGenre)
    private readonly bookGenreRepository: Repository<BookGenre>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(BookAuthor)
    private readonly bookAuthorRepository: Repository<BookAuthor>,
    @InjectRepository(UserBook)
    private readonly userBookRepository: Repository<UserBook>,
  ) {}

  public async createBook(createBookData: CreateBookDto) {
    const { title, genreIds, authorIds } = createBookData;
    console.log(createBookData);
    const { id: bookId } = await this.bookRepository.save({ title });
    const genresAdded = genreIds.map((genreId) => this.bookGenreRepository.create({ genreId, bookId }));
    await this.bookGenreRepository.save(genresAdded);

    const authorsAdded = authorIds.map((authorId) => this.bookAuthorRepository.create({ authorId, bookId }));
    await this.bookAuthorRepository.save(authorsAdded);

    return await this.bookRepository.findOne({
      where: { id: bookId },
      relations: { authors: true, genres: true },
    });
  }

  public async addToFavorites(userId: string, bookId: string) {
    await this.userBookRepository.save({ userId, bookId });

    return await this.bookRepository.findOne({
      where: { id: bookId },
      relations: { favoriteBy: true, authors: true, genres: true },
    });
  }

  public async removeFromFavorites(userId: string, bookId: string) {
    return await this.userBookRepository.delete({ userId, bookId });
  }

  public async createGenre(genreTitle: string) {
    const user = await this.genreRepository.findOneBy({
      title: genreTitle,
    });

    if (user) {
      throw new ForbiddenException("Such genre already exists");
    }

    const { id } = await this.genreRepository.save({ title: genreTitle });

    return await this.genreRepository.findOne({
      where: { id },
      relations: { books: true },
    });
  }

  public async getGenreList() {
    return await this.genreRepository.find({ relations: { books: true } });
  }

  public async createAuthor(fullName: string) {
    const user = await this.authorRepository.findOneBy({
      fullName,
    });

    if (user) {
      throw new ForbiddenException("Such author already exists");
    }

    const { id } = await this.authorRepository.save({ fullName });

    return await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });
  }

  public async getAuthorList() {
    return await this.authorRepository.find({ relations: { books: true } });
  }

  public async findBook(bookParams?: any, relations?: any) {
    return await this.bookRepository.find({
      where: bookParams,
      relations,
    });
  }

  public async getAllBooksBy(bookParams?: any, relations?: any) {
    return await this.bookRepository.find({
      where: bookParams,
      relations,
    });
  }

  public async delete(id: string) {
    return await this.bookRepository.delete(id);
  }
}
