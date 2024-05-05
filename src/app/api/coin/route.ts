import { type NextResponse } from 'next/server';
import postgres from 'postgres';

// const infoUrl = `https://api.coingecko.com/api/v3/search?query=${name}`;
// `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full`

interface CoinData {
    name: string;
    symbol: string;
    thumb: string;
    price_change_percentage_24h: number;
    sparkline: string;
    price: string;
}

export async function GET() {
    if (!process.env.DATABASE_URL) {
        return new Response(`DATABASE_URL environment variable is not defined`, {
          status: 400,
        })
    }

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        // Fetch all stored coins from the database
        // const coins: CoinData[] = await sql`SELECT * FROM trending_coins;`;
    
        // return Response.json(coins);
      } catch (error) {
        return new Response(`Couldn't retrieve stored coins data`, {
          status: 400,
        });
    }
}

export async function PUT() {
    
}