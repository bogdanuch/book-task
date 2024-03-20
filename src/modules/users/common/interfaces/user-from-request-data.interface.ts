import { UserRole } from "../enums";

export interface UserFromRequestData {
  id: string;
  role: UserRole;
  email: string;
}
