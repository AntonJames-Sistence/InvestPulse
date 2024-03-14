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
    // console.log(jsonData)

    // Create table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS trending_coins (
      id SERIAL PRIMARY KEY,
      name TEXT,
      symbol TEXT,
      thumb TEXT,
      price_change_percentage_24h NUMERIC,
      sparkline TEXT,
      price TEXT
    );`;

    // Insert or update data into the table
    for (const coin of jsonData.coins) {
      // Check if the record already exists in the table
      const existingRecord = await sql`
        SELECT id
        FROM trending_coins
        WHERE name = ${coin.item.name};
      `;
    
      if (existingRecord.length > 0) {
        // Update the existing record
        await sql`
          UPDATE trending_coins
          SET 
            symbol = ${coin.item.symbol},
            thumb = ${coin.item.thumb},
            price_change_percentage_24h = ${coin.item.data.price_change_percentage_24h.usd},
            sparkline = ${coin.item.data.sparkline},
            price = ${coin.item.data.price}
          WHERE name = ${coin.item.name};
        `;
      } else {
        // Insert a new record
        await sql`
          INSERT INTO trending_coins (name, symbol, thumb, price_change_percentage_24h, sparkline, price)
          VALUES (${coin.item.name}, ${coin.item.symbol}, ${coin.item.thumb}, ${coin.item.data.price_change_percentage_24h.usd}, ${coin.item.data.sparkline}, ${coin.item.data.price});
        `;
      }
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

    return NextResponse.json("Table 'trending_coins' has been dropped");
  } catch (error) {
    console.error(error);
    return NextResponse.error("Couldn't drop the 'trending_coins' table");
  }
}