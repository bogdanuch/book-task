import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { compare, hash } from "bcryptjs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "../entities";
import { GetUserByEmailData, UpdateUserData } from "../common";
import { CreateUserData } from "../../auth/common/interfaces";
import { CreateUserDto } from "../../auth/common/dto";
import { GetUsersData } from "../common/interfaces";

@Injectable()
export class UsersService {
  private readonly isEmailRegExp: RegExp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  public async create(createUserData: CreateUserDto) {
    const user = await this.getByEmail({
      email: createUserData.email,
    });
    const isPossibleEmail = this.isEmailRegExp.test(createUserData.email);

    if (!isPossibleEmail) {
      throw new ForbiddenException("You've written email incorrectly(it din's pass regex check)");
    }

    if (user) {
      throw new ForbiddenException("Unable to create an account with provided data");
    }

    await this.hashPassword(createUserData);

    const { id } = await this.userRepository.save(createUserData);

    return await this.userRepository.findOne({
      where: { id },
    });
  }

  public async verifyUser(email: string, password: string) {
    const user = await this.getByEmail({ email });

    if (!user) {
      throw new NotFoundException("Incorrect password or email");
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new NotFoundException("Incorrect password or email");
    }

    return user;
  }

  public async findBy(userData: GetUsersData, relations?: any) {
    const user = await this.userRepository.findOne({
      where: userData,
      relations,
    });

    if (!user) {
      throw new NotFoundException("Account with such id doesn't exist");
    }

    return user;
  }

  public async findFavorites(userData: GetUsersData) {
    const user = await this.findBy(userData, { favoriteBooks: { genres: true, authors: true } });

    return user.favoriteBooks;
  }

  public async getAllBy(usersData?: GetUsersData, relations?: any) {
    return await this.userRepository.find({
      where: usersData,
      relations,
    });
  }

  public async getByEmail({ email, relations }: GetUserByEmailData) {
    return await this.userRepository.findOne({
      where: { email },
      relations,
    });
  }

  public async update(id: string, data: UpdateUserData) {
    return await this.userRepository.save({ id, ...data });
  }

  public async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  public async hashPassword(userData: CreateUserData) {
    if (userData.password !== undefined) {
      userData.password = await hash(userData.password, this.configService.get("hashing.bcryptSaltRounds"));
    }
  }
}
