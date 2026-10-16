import Joi, { symbol } from 'joi';
import { TradeSide, TradeStatus } from '../../generated/prisma/enums';

export const validateGetTrades = Joi.object().keys({
  page: Joi.number().optional(),
  limit: Joi.number().optional(),
});

export const validateCreateOrder = Joi.object().keys({
  tradeId: Joi.string().required(),
  symbol: Joi.string().required(),
  side: Joi.equal([TradeSide.BUY, TradeSide.SELL]).required(),
  quantity: Joi.number().required(),
  price: Joi.number().required(),
  trader: Joi.string().required(),
  book: Joi.string().required(),
  counterparty: Joi.string().required(),
});
