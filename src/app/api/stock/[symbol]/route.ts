import { NextResponse } from 'next/server';
import yahooFinance from 'yahoo-finance2';

export async function GET(
  req: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;

  const queryOptions: object = {
    modules: ['price', 'summaryDetail', 'assetProfile'],
  };

  if (!symbol) {
    return NextResponse.json(
      { error: 'Stock symbol is required' },
      { status: 400 }
    );
  }

  try {
    // console.log(`Fetching data for symbol: ${symbol}`);
    const response = await yahooFinance.quoteSummary(symbol, queryOptions);

    const plainStockResult = {
      regularMarketPrice: response.price.regularMarketPrice,
      regularMarketDayLow: response.price.regularMarketDayLow,
      regularMarketDayHigh: response.price.regularMarketDayHigh,
      regularMarketChange: response.price.regularMarketChange,
      regularMarketVolume: response.price.regularMarketVolume,
      regularMarketPreviousClose: response.price.regularMarketPreviousClose,
      preMarketPrice: response.price.preMarketPrice,
      preMarketChangePercent: response.price.preMarketChangePercent,
      shortName: response.price.shortName,
      symbol: response.price.symbol,
      percentageChange24h:
        ((response.price.regularMarketPrice -
          response.price.regularMarketPreviousClose) /
          response.price.regularMarketPreviousClose) *
        100,

      previousClose: response.summaryDetail.previousClose,
      open: response.summaryDetail.open,
      dayLow: response.summaryDetail.dayLow,
      dayHigh: response.summaryDetail.dayHigh,
      volume: response.summaryDetail.volume,
      marketCap: response.summaryDetail.marketCap,
      fiftyTwoWeekHigh: response.summaryDetail.fiftyTwoWeekHigh,
      fiftyTwoWeekLow: response.summaryDetail.fiftyTwoWeekLow,
      dividendRate: response.summaryDetail.dividendRate,

      sector: response.assetProfile.sector,
      overallRisk: response.assetProfile.overallRisk,
      address1: response.assetProfile.address1,
      country: response.assetProfile.country,
      industry: response.assetProfile.industry,
      website: response.assetProfile.website,
      description: response.assetProfile.longBusinessSummary,
    };

    // Conver to plain result, because of next.js SSR specifics
    // const plainStockResult = JSON.parse(JSON.stringify(stockResult));

    return NextResponse.json(plainStockResult);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch stock data' },
      { status: 500 }
    );
  }
}
