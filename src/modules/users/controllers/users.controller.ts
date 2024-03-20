import { Controller, Get, Delete, UseGuards, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "../services";
import { JwtAuthGuard } from "../../auth/common/guards";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UserFromRequestData } from "../common";
import { User } from "../entities";
import { Book } from "../../books/entities";
import { FindUserDto } from "../common/dto";

@ApiTags("Users")
@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: "Returns data from the current account by bearer token" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async getCurrentUser(@CurrentUser() { id }: UserFromRequestData) {
    return this.usersService.findBy({ id });
  }

  @ApiOkResponse({ type: Book, isArray: true })
  @ApiOperation({ summary: "Returns list of favorite books of current user" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("favorites")
  async getFavoriteBooks(@CurrentUser() { id }: UserFromRequestData) {
    return this.usersService.findFavorites({ id });
  }

  @ApiOkResponse({ type: User, isArray: true })
  @ApiOperation({ summary: "Return list of all users" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("list")
  async users() {
    return this.usersService.getAllBy();
  }

  @ApiOkResponse({ type: User })
  @ApiOperation({ summary: "Search for user by email" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get("find")
  async findUser(@Query() { email }: FindUserDto) {
    return this.usersService.getByEmail({ email });
  }

  @ApiOperation({ summary: "Deletes user by the given bearer token" })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete()
  async removeUser(@CurrentUser() { id }: UserFromRequestData) {
    return this.usersService.delete(id);
  }
}
