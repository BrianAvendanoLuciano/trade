import Joi from 'joi';
import { ValidateFrom } from '../types/api.types';
import { NextFunction, Request, Response } from 'express';

export const validateRequest = (
  schema: Joi.Schema,
  toValidate: ValidateFrom,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { query, body } = req;
    const data = toValidate === 'query' ? query : body;
    const validationOptions: Joi.ValidationOptions = {
      errors: { label: 'key' },
      abortEarly: false,
    };

    const { error } = Joi.compile(schema)
      .prefs(validationOptions)
      .validate(data);

    if (error) {
      const errorMessages = error.details.map((err) => err.message).join(', ');
      return res.status(400).json({
        code: 'INVALID_DATA',
        message: errorMessages,
      });
    }
    next();
  };
};
