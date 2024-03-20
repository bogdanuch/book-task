import { Injectable } from "@nestjs/common";
import { JwtAccessService } from "../common/libs/access-token/jwt-access.service";
import { JwtRefreshService } from "../common/libs/refresh-token/jwt-refresh.service";
import { UsersService } from "../../users/services";
import { CreateTokensData, CreateUserData } from "../common/interfaces";
import { LoginDto } from "../common/dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAccessService: JwtAccessService,
    private readonly jwtRefreshService: JwtRefreshService,
    private readonly usersService: UsersService,
  ) {}

  public async register(createUserData: CreateUserData) {
    const user = await this.usersService.create(createUserData);

    return this.createTokens({
      role: user.role,
      email: user.email,
      id: user.id,
    });
  }

  public async login(loginUserData: LoginDto) {
    const user = await this.usersService.verifyUser(loginUserData.email, loginUserData.password);

    return await this.createTokens({
      role: user.role,
      email: user.email,
      id: user.id,
    });
  }

  public async createTokens(data: CreateTokensData) {
    const accessToken = await this.jwtAccessService.signAsync(data);
    const refreshToken = await this.jwtRefreshService.signAsync(data);

    return { accessToken, refreshToken };
  }
}
