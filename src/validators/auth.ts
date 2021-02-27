import Joi from '@hapi/joi';

const displayName = Joi.string().min(3).max(100).trim().required();
const email = Joi.string().email().min(8).max(254).trim().required();
const password = Joi.string().min(6).max(72, 'utf-8').required();

export const signupValidator = Joi.object({
  displayName,
  email,
  password,
});
export const signinValidator = Joi.object({
  email,
  password,
});
