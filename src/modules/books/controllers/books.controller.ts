import { Controller, Get, UseGuards, Post, Body, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { BooksService } from "../services";
import { JwtAuthGuard, RolesGuard } from "../../auth/common/guards";
import { Author, Book, Genre } from "../entities";
import { UserFromRequestData, UserRole } from "../../users/common";
import { CurrentUser } from "../../users/common/decorators/current-user.decorator";
import { FavoritesDto, CreateBookDto, CreateGenreDto } from "../common/dto";
import { CreateAuthorDto, FindBookDto } from "../common/dto";
import { Roles } from "../../auth/common/decorators/roles.decorator";

@ApiTags("Books")
@Controller("books")
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: "Creates genre and returns it's object" })
  @ApiOkResponse({ type: Genre, description: "Object of the created genre" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth()
  @Post("create-genre")
  async createGenre(@Body() { title }: CreateGenreDto) {
    return this.booksService.createGenre(title);
  }

  @ApiOperation({ summary: "Returns list of available genres" })
  @ApiOkResponse({ type: Genre, isArray: true, description: "List of available genres" })
  @Get("genres")
  async getGenresList() {
    return this.booksService.getGenreList();
  }

  @ApiOperation({ summary: "Creates author and returns it's object" })
  @ApiOkResponse({ type: Author, description: "Object of the created author" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth()
  @Post("create-author")
  async createAuthor(@Body() { fullName }: CreateAuthorDto) {
    return this.booksService.createAuthor(fullName);
  }

  @ApiOperation({ summary: "Returns list of available authors" })
  @ApiOkResponse({ type: Author, isArray: true, description: "List of available authors" })
  @Get("authors")
  async getAuthorList() {
    return this.booksService.getAuthorList();
  }

  @ApiOperation({
    summary: "Creates book and returns it's object(to create book you first need to create author and genre)",
  })
  @ApiOkResponse({ type: Book, description: "Object of the created book" })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMINISTRATOR)
  @ApiBearerAuth()
  @Post("create-book")
  async createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @ApiOperation({
    summary: "Add book to favorites",
  })
  @ApiOkResponse({ type: Book, description: "Object of the created book" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("add-to-favorite")
  async addToFavorites(@CurrentUser() { id }: UserFromRequestData, @Body() { bookId }: FavoritesDto) {
    return this.booksService.addToFavorites(id, bookId);
  }

  @ApiOperation({
    summary: "Add book to favorites",
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post("remove-from-favorite")
  async removeFromFavorites(@CurrentUser() { id }: UserFromRequestData, @Body() { bookId }: FavoritesDto) {
    return this.booksService.removeFromFavorites(id, bookId);
  }

  @ApiOperation({
    summary: "Get all availiable books",
  })
  @ApiOkResponse({ type: Book, isArray: true })
  @Get("list")
  async getBookList() {
    return this.booksService.getAllBooksBy({}, { genres: true, authors: true });
  }

  @ApiOperation({
    summary: "Search for book by it's title",
  })
  @ApiOkResponse({ type: Book })
  @Get()
  async findBook(@Query() { title }: FindBookDto) {
    return this.booksService.findBook({ title }, { authors: true, genres: true });
  }
}
