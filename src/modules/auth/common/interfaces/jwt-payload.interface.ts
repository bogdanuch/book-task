export interface JwtPayload {
  email: string;
  id: string;
  role: string;
  iat: number;
  exp: number;
}
