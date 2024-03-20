import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../../../users/common";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);
