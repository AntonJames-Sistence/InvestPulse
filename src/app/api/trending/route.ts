// import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  thumb: string;
  price_change_percentage_24h: number;
  sparkline: string;
  price: number;
}

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return new Response(``, {
      status: 400,
      statusText: `Couldn't reach DB, please check your key`,
    });
  }

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  try {
    // Fetch all stored coins from the database
    const coins: CoinData[] = await sql`SELECT * FROM trending_coins;`;

    return Response.json(coins);
  } catch (error) {
    return new Response('', {
      status: 400,
      statusText: `Couldn't retrieve stored coins data, ${error}`,
    });
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
