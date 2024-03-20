import { Body, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../services";
import { TokensInterceptor } from "../common/interceptors/tokens.interceptor";
import { CreateUserDto, LoginDto } from "../common/dto";
import { JwtRefreshAuthGuard } from "../common/guards";
import { CurrentUser } from "../../users/common/decorators/current-user.decorator";
import { UserFromRequestData } from "../../users/common";
import { TokensOutput } from "../common/outputs";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary:
      "Returns access and refresh tokens. It's not required to put them to header in web version, since they're also stored in cookies",
  })
  @ApiOkResponse({ type: TokensOutput })
  @Post("register")
  @UseInterceptors(TokensInterceptor)
  async register(@Body() createUserDto: CreateUserDto): Promise<TokensOutput> {
    return this.authService.register(createUserDto);
  }

  @ApiOperation({
    summary:
      "Returns access and refresh tokens. It's not required to put them to header in web version, since they're also stored in cookies",
  })
  @ApiOkResponse({ type: TokensOutput })
  @Post("login")
  @UseInterceptors(TokensInterceptor)
  async login(@Body() body: LoginDto): Promise<TokensOutput> {
    return this.authService.login(body);
  }

  @ApiOperation({ summary: "Returns new access and refresh tokens" })
  @ApiOkResponse({ type: TokensOutput })
  @ApiForbiddenResponse({
    description: "You didn't pass a correct refresh token",
  })
  @Post("refresh-tokens")
  @UseGuards(JwtRefreshAuthGuard)
  @UseInterceptors(TokensInterceptor)
  @ApiBearerAuth()
  async refreshTokens(@CurrentUser() currentUser: UserFromRequestData): Promise<TokensOutput> {
    return await this.authService.createTokens(currentUser);
  }
}
