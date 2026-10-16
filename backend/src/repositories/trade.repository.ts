import { Prisma, Trade, TradeStatus } from '../../generated/prisma/client';
import {
  TradeCreateInput,
  TradeUpdateInput,
} from '../../generated/prisma/models';
import { prisma } from '../config/database';
import { PaginatedTrades } from '../types/trade';

export default class TradeRepository {
  async getAllTrade(page: number, limit: number): Promise<PaginatedTrades> {
    const skip = (page - 1) * limit;

    const [trades, total] = await prisma.$transaction([
      prisma.trade.findMany({
        skip,
        take: limit,
        orderBy: {
          tradeTimestamp: 'desc',
        },
      }),
      prisma.trade.count(),
    ]);

    return {
      data: trades,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findTradeById(id: string): Promise<Trade | null> {
    return prisma.trade.findUnique({
      where: { id },
    });
  }

  async createTrade(data: TradeCreateInput): Promise<Trade> {
    return prisma.trade.create({ data });
  }

  async updateTrade(id: string, data: TradeUpdateInput): Promise<Trade> {
    return prisma.trade.update({
      where: { id },
      data,
    });
  }

  async updateTradeStatus(id: string, status: TradeStatus): Promise<Trade> {
    return prisma.trade.update({
      where: { id },
      data: { status },
    });
  }
}
