import { NextFunction, Request, Response } from 'express';
import { IS_DEVELOPMENT } from '../config';

import { HttpException } from '../error';

export const NotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpException(404, `🔎 Not found at ${req.originalUrl}`);
  next(error);
};

export const GlobalErrorHandler = (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode: number =
    err.status === 200 || err.status === undefined ? 500 : err.status;
  res.status(statusCode);
  console.log('ERRORE', err.message);
  res.json({
    message: err.message,
    stack: IS_DEVELOPMENT ? err.stack : {},
  });
};
