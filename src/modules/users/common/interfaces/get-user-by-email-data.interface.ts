import { UserRole } from "../enums";

export interface GetUserByEmailData {
  email: string;
  role?: UserRole;
  relations?: any;
}
