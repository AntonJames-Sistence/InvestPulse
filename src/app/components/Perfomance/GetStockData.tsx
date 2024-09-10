import { StockData } from '../../types/StockDataInterfaces';

export async function getStockData(symbol: string): Promise<StockData | null> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stock/${symbol}`,
    {
      next: { revalidate: 3600 }, // revalidate in 1h
    }
  );

  if (!response.ok) return null;

  return response.json();
}
