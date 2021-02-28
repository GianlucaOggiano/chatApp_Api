import Joi from '@hapi/joi';

const displayName = Joi.string().min(3).max(100).trim().required();
const email = Joi.string().email().min(8).max(254).trim().required();
const bio = Joi.string().allow('').max(254).trim();
const phoneNumber = Joi.string().allow('').max(100).trim();
const photoURL = Joi.string().allow('').max(254).trim();

export const updateProfileValidator = Joi.object({
  displayName,
  email,
  bio,
  phoneNumber,
  photoURL,
});
