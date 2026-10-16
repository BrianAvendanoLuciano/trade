import { Trade } from '../../generated/prisma/client';

export interface PaginatedTrades {
  data: Trade[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
