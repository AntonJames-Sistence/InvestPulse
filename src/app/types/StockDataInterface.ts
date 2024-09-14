export interface StockData {
  regularMarketPrice: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  regularMarketChange: number;
  regularMarketVolume: number;
  regularMarketPreviousClose: number;
  preMarketPrice: number;
  preMarketChangePercent: number;
  percentageChange24h: number;
  shortName: string;
  symbol: string;

  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  volume: number;
  marketCap: number;
  dividendRate: number;
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;

  sector: string;
  overallRisk: number;
  address1: string;
  country: string;
  industry: string;
  website: string;
  description: string;
}
