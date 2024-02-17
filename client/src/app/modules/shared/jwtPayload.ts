import { JwtPayload } from 'jwt-decode';

export type CustomJwtPayload = JwtPayload & {
  username: string;
  id: string;
  email: string;
};
