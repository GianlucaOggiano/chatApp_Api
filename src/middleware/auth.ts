import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../error';
import { isLoggedIn } from '../helpers/auth';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (isLoggedIn(req)) return next();
  throw new HttpException(401, 'Unauthorized.You must be logged in');
};
