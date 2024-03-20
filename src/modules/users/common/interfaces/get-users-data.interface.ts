import { UserRole } from "../enums";

export interface GetUsersData {
  id?: string;
  email?: string;
  fullName?: string;
  role?: UserRole;
}
