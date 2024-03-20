import { UserRole } from "../../../users/common";

export interface CreateTokensData {
  email: string;
  id: string;
  role: UserRole;
}
