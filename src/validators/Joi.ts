import { ObjectSchema } from '@hapi/joi';
import { HttpException } from '../error';

export const validate = async (schema: ObjectSchema, payload: any) => {
  try {
    await schema.validateAsync(payload, { abortEarly: true });
  } catch (error) {
    const err = new HttpException(422, error.message);
    throw err;
  }
};
