import { NextFunction, Request, Response } from 'express';

import { HttpException } from '../error';
import { setLogged } from '../helpers/auth';
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
    setLogged(req, newUser.id);

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

    setLogged(req, user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await req.session.destroy((err) => console.log(err));
  res.clearCookie('sid'); //TODO:see this
  res.json({ success: true });
};
