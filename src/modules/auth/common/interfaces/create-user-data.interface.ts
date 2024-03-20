import { CreateUserDto } from "../dto";

export interface CreateUserData extends CreateUserDto {
  IPAddress?: string;
  userAgent?: string;
}
