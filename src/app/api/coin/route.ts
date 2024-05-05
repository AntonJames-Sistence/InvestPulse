import { type NextResponse } from 'next/server';
import postgres from 'postgres';

// const infoUrl = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;
// `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&precision=full`
//{
    // "bitcoin": {
    //     "usd": 63921.986266966174,
    //     "usd_market_cap": 1258417281128.8655,
    //     "usd_24h_vol": 21326473102.232346,
    //     "usd_24h_change": 1.667780568893945
    //   }
    // }

interface CoinData {
    name: string;
    symbol: string;
    thumb: string;
    price_change_percentage_24h: number;
    sparkline: string;
    price: string;
}

export async function GET() {
    let coinName = 'bitcoin'; // change to request coinName
    const url = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;
    if (!process.env.DATABASE_URL) {
        return new Response(`DATABASE_URL environment variable is not defined`, {
          status: 400,
        })
    }

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch trending coins");
        } else {
            const jsonData = await res.json();
            console.log(jsonData)
        }
    
        // return Response.json(coins);
      } catch (error) {
        return new Response(`Couldn't retrieve stored coins data`, {
          status: 400,
        });
    }
}

export async function PUT() {

}