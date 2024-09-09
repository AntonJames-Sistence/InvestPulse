import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import yahooFinance from 'yahoo-finance2';

export async function GET() {
  const symbols = ['AAPL', 'NVDA', 'MSFT']; // Add more symbols as needed

  const queryOptions = {
    modules: ['price', 'summaryDetail', 'assetProfile'] as any
  };

  try {
    console.log(`Fetching data for symbol ... from trading view`);
    // Use Promise.all to fetch data for multiple symbols in parallel
    const results = await Promise.all(
      symbols.map(async (symbol) => {
        const stockResult = await yahooFinance.quoteSummary(symbol, queryOptions);

        // Calculate percentage change for 24 hours
        const percentageChange24h = ((stockResult.price.regularMarketPrice - stockResult.price.regularMarketPreviousClose) / stockResult.price.regularMarketPreviousClose) * 100;

        // Embed the percentage change into the response
        stockResult.price.percentageChange24h = percentageChange24h; // Add percentage change with 2 decimal places

        return stockResult; // Return symbol and result
      })
    );

    const response = NextResponse.json(results);
    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}


export async function POST() {
  if (!process.env.DATABASE_URL) {
    return new Response('', {
      status: 400,
      statusText: `Couldn't reach DB, please check your key`,
    });
  }

  const url = 'https://api.coingecko.com/api/v3/search/trending';
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch trending coins');
    }

    const jsonData = await res.json();

    // Drop table
    await sql`DROP TABLE IF EXISTS trending_coins;`;

    // Create table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS trending_coins (
      id TEXT PRIMARY KEY,
      name TEXT,
      symbol TEXT,
      image TEXT,
      price_change_percentage_24h NUMERIC,
      sparkline TEXT,
      price NUMERIC
    );`;

    // Insert or update data into the table
    for (const coin of jsonData.coins) {
      // Check if the record already exists in the table
      const existingRecord =
        await sql`SELECT * FROM trending_coins WHERE id = ${coin.item.id};`;

      if (existingRecord.length > 0) {
        // Update the existing record
        await sql`
          UPDATE trending_coins
          SET 
            symbol = ${coin.item.symbol},
            image = ${coin.item.thumb},
            price_change_percentage_24h = ${coin.item.data.price_change_percentage_24h.usd},
            sparkline = ${coin.item.data.sparkline},
            price = ${coin.item.data.price}
          WHERE id = ${coin.item.id};
        `;
      } else {
        // Insert a new record
        await sql`
          INSERT INTO trending_coins (id, name, symbol, image, price_change_percentage_24h, sparkline, price)
          VALUES (${coin.item.id}, ${coin.item.name}, ${coin.item.symbol}, ${coin.item.thumb}, ${coin.item.data.price_change_percentage_24h.usd}, ${coin.item.data.sparkline}, ${coin.item.data.price});
        `;
      }
    }

    return new Response(``, {
      status: 200,
      statusText: 'Successfully updated data',
    });
  } catch (error) {
    return new Response(``, {
      status: 400,
      statusText: `Couldn't update stored coins data, ${error}`,
    });
  }
}
