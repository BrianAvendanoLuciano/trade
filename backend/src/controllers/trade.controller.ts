import type { Request, Response } from 'express';
import TradeService from '../services/trade.service';
import { asyncHandler } from '../utils/asyncHandler';
import type {
  TradeCreateInput,
  TradeUpdateInput,
} from '../../generated/prisma/models';

export default class TradeController {
  #tradeService = new TradeService();

  getAllTrades = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    const paginate = { page, limit };

    const trades = await this.#tradeService.getTrades(paginate);

    res.status(200).json({ status: 'success', data: trades });
  });

  createTrade = asyncHandler(async (req: Request, res: Response) => {
    const data: TradeCreateInput = {
      ...req.body.data,
    };

    const createdTrade = await this.#tradeService.createTrade(data);
    res.status(201).json({
      status: 'success',
      data: createdTrade,
    });
  });

  amendTrade = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id;
    const data: TradeUpdateInput = {
      ...req.body.data,
    };

    const amendedTrade = await this.#tradeService.amendTrade(id, data);

    res.status(201).json({
      status: 'success',
      data: amendedTrade,
    });
  });

  cancelTrade = asyncHandler(async (req: Request, res: Response) => {
    const id = req.body.id;
    const amendedTrade = await this.#tradeService.cancelTrade(id);

    res.status(201).json({
      status: 'success',
      data: amendedTrade,
    });
  });
}
