-- CreateEnum
CREATE TYPE "TradeSide" AS ENUM ('BUY', 'SELL');

-- CreateEnum
CREATE TYPE "TradeStatus" AS ENUM ('ACTIVE', 'CANCELLED');

-- CreateTable
CREATE TABLE "trades" (
    "id" UUID NOT NULL,
    "tradeId" TEXT NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "side" "TradeSide" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(18,4) NOT NULL,
    "trader" VARCHAR(50) NOT NULL,
    "book" VARCHAR(50) NOT NULL,
    "counterparty" VARCHAR(100) NOT NULL,
    "tradeTimestamp" TIMESTAMPTZ NOT NULL,
    "status" "TradeStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trades_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "trades_tradeId_key" ON "trades"("tradeId");

-- CreateIndex
CREATE INDEX "trades_symbol_idx" ON "trades"("symbol");

-- CreateIndex
CREATE INDEX "trades_book_idx" ON "trades"("book");
