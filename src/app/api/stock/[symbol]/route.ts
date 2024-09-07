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
    const stockResult = await yahooFinance.quoteSummary(symbol, queryOptions);
    // console.log(stockResult)
    return NextResponse.json(stockResult);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}
