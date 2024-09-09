import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(req: Request, { params }: { params: { symbol: string } }) {
  const { symbol } = params;

  const queryOptions = {
    modules: ['price', 'summaryDetail', 'assetProfile'] as any
  };

  if (!symbol) {
    return NextResponse.json({ error: 'Stock symbol is required' }, { status: 400 });
  }

  try {
    // console.log(`Fetching data for symbol: ${symbol}`);
    const stockResult = await yahooFinance.quoteSummary(symbol, queryOptions);

    const percentageChange24h =
    ((stockResult.price.regularMarketPrice -
      stockResult.price.regularMarketPreviousClose) /
      stockResult.price.regularMarketPreviousClose) *
    100;
    stockResult.price.percentageChange24h = percentageChange24h

    const response = NextResponse.json(stockResult);
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
