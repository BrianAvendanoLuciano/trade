import type { Request, Response } from 'express';
import TradeService from '../services/trade.service';
import { asyncHandler } from '../utils/asyncHandler';

export default class TradeController {
  #tradeService = new TradeService();

  getAllTrades = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const paginate = { page, limit };

    const trades = await this.#tradeService.getTrades(paginate);

    res.status(200).json({ data: trades });
  });
}
