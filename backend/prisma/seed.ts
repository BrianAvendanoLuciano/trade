
import "dotenv/config";
import { randomInt } from "node:crypto";
import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Prisma,
  TradeSide,
  TradeStatus,
} from "../generated/prisma/client";

const connectionString = process.env.DATABASE_URL!;

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const symbols = [
  { symbol: "AAPL", min: 180, max: 260 },
  { symbol: "MSFT", min: 400, max: 560 },
  { symbol: "TSLA", min: 250, max: 400 },
  { symbol: "NVDA", min: 100, max: 200 },
  { symbol: "AMZN", min: 180, max: 250 },
];

const traders = ["JSMITH", "ABROWN", "MJONES", "RWILSON"];
const books = ["EQUITIES_UK", "EQUITIES_US", "TECH_GROWTH"];
const counterparties = [
  "Goldman Sachs",
  "JP Morgan",
  "Morgan Stanley",
  "Barclays",
];

function pick<T>(items: readonly T[]): T {
  return items[randomInt(items.length)];
}

function randomTimestamp(): Date {
  const start = Date.parse("2026-08-18T00:00:00Z");
  const end = Date.parse("2026-10-15T23:59:59Z");

  return new Date(randomInt(start, end + 1));
}

async function main() {
  const trades = Array.from({ length: 500 }, (_, i) => {
    const instrument = pick(symbols);
    const priceUnits = randomInt(
      instrument.min * 10000,
      instrument.max * 10000 + 1,
    );

    return {
      tradeId: `TRD-${100001 + i}`,
      symbol: instrument.symbol,
      side: pick([TradeSide.BUY, TradeSide.SELL]),
      quantity: randomInt(100, 10001),
      price: new Prisma.Decimal(priceUnits).div(10000),
      trader: pick(traders),
      book: pick(books),
      counterparty: pick(counterparties),
      tradeTimestamp: randomTimestamp(),
      status: pick([
        TradeStatus.ACTIVE,
        TradeStatus.ACTIVE,
        TradeStatus.CANCELLED,
      ]),
    };
  });

  const result = await prisma.trade.createMany({
    data: trades,
    skipDuplicates: true,
  });

  console.log(`Inserted ${result.count} trades.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
