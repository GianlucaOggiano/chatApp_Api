import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { HttpException } from '../error';
import { Channel } from '../models';

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const channels = await Channel.find();
    res.json(channels);
  } catch (error) {
    next(error);
  }
};

export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id);
    res.json(channel);
  } catch (error) {
    next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description } = req.body;
  try {
    const channel = new Channel({
      name,
      description,
      admin: req.session.userId,
      members: [req.session.userId],
    });
    await channel.save();
    res.json(channel);
  } catch (error) {
    next(error);
  }
};

export const subscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findByIdAndUpdate(
      { _id: id },
      { $push: { members: req.session.userId } },
      { new: true }
    );
    res.json(channel);
  } catch (error) {
    next(error);
  }
};

export const unSubscribe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findOneAndUpdate(
      { _id: id },
      { $pull: { members: req.session.userId } },
      { new: true }
    );
    res.json(channel);
  } catch (error) {
    next(error);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findById(id);
    if (!channel) {
      throw new HttpException(404, 'This channel does not exist');
    }

    if (channel.admin.toString() !== req.session.userId) {
      throw new HttpException(401, 'You not have permissions.');
    }
    await channel?.remove();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
