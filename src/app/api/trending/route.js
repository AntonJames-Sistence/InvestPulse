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

    // Create table if it doesn't exist
    await sql`CREATE TABLE IF NOT EXISTS trending_coins (
      id SERIAL PRIMARY KEY,
      name TEXT,
      symbol TEXT
    );`;

    // Insert data into the table
    for (const coin of jsonData.coins) {
      await sql`INSERT INTO trending_coins (name, symbol) VALUES (${coin.item.name}, ${coin.item.symbol});`;
    }

    console.log(jsonData);

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
