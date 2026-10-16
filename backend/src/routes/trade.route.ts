import express from 'express';
import TradeController from '../controllers/trade.controller';
import { validateRequest } from '../middlewares/validation.middleware';
import { validateGetTrades } from '../dtos/trade.dto';

export const tradeRouter = express.Router();
const tradeController = new TradeController();

tradeRouter.get(
  '/',
  validateRequest(validateGetTrades, 'query'),
  tradeController.getAllTrades,
);
