import type { ErrorRequestHandler } from 'express';
import { Prisma } from '../../generated/prisma/client';
import { AppError } from '../errors/AppError';

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
      },
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        error: {
          code: 'DUPLICATE_RESOURCE',
          message: 'A record with this value already exists',
        },
      });
      return;
    }

    if (err.code === 'P2025') {
      res.status(404).json({
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'The requested record was not found',
        },
      });
      return;
    }
  }

  console.error(err);

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected error occured',
    },
  });
};
