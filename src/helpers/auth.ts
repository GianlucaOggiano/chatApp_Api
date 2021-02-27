import { Request } from 'express';

export const isLoggedIn = (req: Request) => !!req.session.userId;

export const setLogged = (req: Request, userId: string) => {
  req.session.userId = userId;
};
