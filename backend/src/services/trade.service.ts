import type {
  TradeCreateInput,
  TradeUpdateInput,
} from '../../generated/prisma/models';
import { AppError } from '../errors/AppError';
import TradeRepository from '../repositories/trade.repository';
import { Pagination } from '../types/api.types';

export default class TradeService {
  private tradeRepository = new TradeRepository();

  async getTrades(params: Pagination) {
    const page = params.page || 1;
    const limit = params.limit || 50;
    const trades = await this.tradeRepository.getAllTrade(page, limit);

    return trades;
  }

  async createTrade(data: TradeCreateInput) {
    return this.tradeRepository.createTrade(data);
  }

  async amendTrade(id: string, data: TradeUpdateInput) {
    const existingTrade = await this.tradeRepository.findTradeById(id);

    if (!existingTrade) {
      throw new AppError(404, 'Trade does not exists', 'TRADE_NOT_FOUND');
    }

    if (existingTrade.status === 'CANCELLED') {
      throw new AppError(
        400,
        'Cannot amend cancelled trade',
        'TRADE_CANNOT_AMEND',
      );
    }

    return this.tradeRepository.updateTrade(id, data);
  }

  async cancelTrade(id: string) {
    const existingTrade = await this.tradeRepository.findTradeById(id);

    if (!existingTrade) {
      throw new AppError(404, 'Trade does not exists', 'TRADE_NOT_FOUND');
    }

    if (existingTrade.status === 'CANCELLED') {
      throw new AppError(
        400,
        'Trade already cancelled',
        'TRADE_ALREADY_CANNCELLED',
      );
    }

    return this.tradeRepository.updateTradeStatus(id, 'CANCELLED');
  }
}
