import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../error';
import { User } from '../models';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const userAlreadyExist = await User.exists({ email });
    if (userAlreadyExist) {
      throw new HttpException(422, 'Invalid email or passsword.Please retry.');
    }

    const newUser = new User({
      email,
      password,
    });
    await newUser.save();
    req.session.userId = newUser.id;
    res.json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.json({ user: req.session.userId });
};
