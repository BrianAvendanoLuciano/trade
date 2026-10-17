import express from 'express';
import TradeController from '../controllers/trade.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { validateCreateOrder, validateGetTrades } from '../dtos/trade.dto';

export const tradeRouter = express.Router();
const tradeController = new TradeController();

tradeRouter.get(
  '/',
  validateRequest(validateGetTrades, 'query'),
  tradeController.getAllTrades,
);

tradeRouter.post(
  '/',
  validateRequest(validateCreateOrder, 'body'),
  tradeController.createTrade,
);
tradeRouter.patch(
  '/',
  validateRequest(validateCreateOrder, 'body'),
  tradeController.amendTrade,
);
tradeRouter.post(
  '/cancel',
  validateRequest(validateCreateOrder, 'body'),
  tradeController.cancelTrade,
);
