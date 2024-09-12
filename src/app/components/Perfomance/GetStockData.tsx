export async function getStockData(symbol: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/stock/${symbol}`
  );

  if (!response.ok) return null;

  return response.json();
}
