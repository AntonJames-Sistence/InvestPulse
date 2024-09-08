export interface AssetProfile {
    address1: string;
    auditRisk: number;
    boardRisk: number;
    city: string;
    compensationAsOfEpochDate: string;
    compensationRisk: number;
    country: string;
    fullTimeEmployees: number;
    governanceEpochDate: string;
    industry: string;
    industryDisp: string;
    industryKey: string;
    irWebsite: string;
    longBusinessSummary: string;
    maxAge: number;
    overallRisk: number;
    phone: string;
    sector: string;
    sectorDisp: string;
    sectorKey: string;
    shareHolderRightsRisk: number;
    state: string;
    website: string;
    zip: string;
  }
  
  // interface for price data
  export interface Price {
    averageDailyVolume3Month: number;
    averageDailyVolume10Day: number;
    currency: string;
    currencySymbol: string;
    exchange: string;
    exchangeName: string;
    longName: string;
    marketCap: number;
    regularMarketPrice: number;
    regularMarketChange: number;
    regularMarketChangePercent: number;
    regularMarketDayHigh: number;
    regularMarketDayLow: number;
    regularMarketOpen: number;
    regularMarketPreviousClose: number;
    regularMarketVolume: number;
    postMarketPrice?: number;
    postMarketChange?: number;
    postMarketChangePercent?: number;
    preMarketPrice?: number;
    preMarketChange?: number;
    preMarketChangePercent?: number;
    shortName: string;
    symbol: string;
    percentageChange24h: number;
  }
  
  // interface for summaryDetail data
  export interface SummaryDetail {
    ask: number;
    askSize: number;
    averageVolume: number;
    beta: number;
    bid: number;
    bidSize: number;
    dayHigh: number;
    dayLow: number;
    dividendRate: number;
    dividendYield: number;
    exDividendDate: string;
    fiftyDayAverage: number;
    fiftyTwoWeekHigh: number;
    fiftyTwoWeekLow: number;
    forwardPE: number;
    open: number;
    previousClose: number;
    priceToSalesTrailing12Months: number;
    trailingAnnualDividendRate: number;
    trailingAnnualDividendYield: number;
    trailingPE: number;
    twoHundredDayAverage: number;
    volume: number;
  }
  
  // Combine all interfaces into a main interface
  export interface StockData {
    assetProfile: AssetProfile;
    price: Price;
    summaryDetail: SummaryDetail;
  }
  