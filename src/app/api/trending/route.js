import { NextResponse } from "next/server";
import postgres from 'postgres';

export async function PUT() {
  const url = 'https://api.coingecko.com/api/v3/search/trending';

  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch trending coins");
    }

    const jsonData = await res.json();
    // console.log(jsonData.coins[0].item.data.price_change_percentage_24h.usd)

    // Create table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS trending_coins (
      id SERIAL PRIMARY KEY,
      name TEXT,
      symbol TEXT,
      thumb TEXT,
      price_change_percentage_24h NUMERIC
    );`;

    console.log('inserting...')

    // Insert or update data into the table
    for (const coin of jsonData.coins) {
      await sql`
        INSERT INTO trending_coins (name, symbol, thumb, price_change_percentage_24h)
        VALUES (${coin.item.name}, ${coin.item.symbol}, ${coin.item.thumb}, ${coin.item.data.price_change_percentage_24h.usd})
        ON CONFLICT (name) DO UPDATE
        SET 
          symbol = EXCLUDED.symbol,
          thumb = EXCLUDED.thumb,
          price_change_percentage_24h = EXCLUDED.price_change_percentage_24h;
      `;
    }

    return NextResponse.json("Successfully updated data");
  } catch (error) {
    return NextResponse.error("Couldn't retrieve trending coins data");
  }
}

export async function GET() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  try {
    // Fetch all stored coins from the database
    const coins = await sql`SELECT * FROM trending_coins;`;

    console.log(coins);

    return NextResponse.json(coins);
  } catch (error) {
    console.error(error);
    return NextResponse.error("Couldn't retrieve stored coins data");
  }
}

export async function DELETE() {
  const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  try {
    // Drop the table if it exists
    await sql`DROP TABLE IF EXISTS trending_coins;`;

    console.log("Table 'trending_coins' has been dropped");

    return NextResponse.json("Table 'trending_coins' has been dropped");
  } catch (error) {
    console.error(error);
    return NextResponse.error("Couldn't drop the 'trending_coins' table");
  }
}