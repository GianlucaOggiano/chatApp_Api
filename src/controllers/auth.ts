import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../error';
import { User } from '../models';
import { signinValidator, signupValidator, validate } from '../validators';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { displayName, email, password } = req.body;
  try {
    await validate(signupValidator, { displayName, email, password });

    const userAlreadyExist = await User.exists({ email });
    if (userAlreadyExist) {
      throw new HttpException(422, 'Invalid email or passsword.Please retry.');
    }

    const newUser = new User({
      displayName,
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
  const { email, password } = req.body;
  try {
    await validate(signinValidator, { email, password });

    const user = await User.findOne({ email });
    if (!user || !(await user.matchesPassword(password))) {
      throw new HttpException(422, 'Invalid email or password.Please retry.');
    }

    req.session.userId = user.id;
    res.json(user);
  } catch (error) {
    next(error);
  }
};
