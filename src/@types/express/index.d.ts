import { User } from '../../user/entities/user.entity'; // ajuste o path conforme o teu projeto
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    logOut?: (callback: (err?: any) => void) => void;
  }
}
