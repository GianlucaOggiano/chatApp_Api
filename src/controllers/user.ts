import { NextFunction, Request, Response } from 'express';
import { User } from '../models';
import { updateProfileValidator, validate } from '../validators';

export const profile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    await validate(updateProfileValidator, req.body);
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    res.json(user);
  } catch (error) {
    next(error);
  }
};
