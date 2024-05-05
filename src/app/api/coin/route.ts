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
        let existingCoin = await sql`SELECT id FROM coins WHERE name = ${coinName}`;
        console.log(existingCoin)
        if (existingCoin.length > 0) {
            // Check if last_updated is more than 24 hours ago
            const lastUpdated = existingCoin[0].last_updated;
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            if (lastUpdated > twentyFourHoursAgo) {
                // Coin data is up to date, return it
                return Response.json(existingCoin[0])
            }
        }

        // Fetch data from Coingecko API
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error("Failed to fetch coin data");
        }
        const jsonData = await res.json();
        
        await sql`
              INSERT INTO coins (symbol, name, description, homepage, image, market_cap_rank, current_price, ath, ath_change_percentage, ath_date, atl, atl_change_percentage, atl_date, market_cap, total_volume, high_24h, low_24h, price_change_24h, price_change_percentage_24h, price_change_percentage_7d, price_change_percentage_1y, last_updated)
              VALUES (${jsonData.symbol}, ${jsonData.name}, ${jsonData.description.en}, ${jsonData.links.homepage[0]}, ${jsonData.image.large}, ${jsonData.market_cap_rank}, ${jsonData.market_data.current_price.usd}, ${jsonData.ath.usd}, ${jsonData.ath_change_percentage.usd}, ${jsonData.ath_date.usd}, ${jsonData.atl.usd}, ${jsonData.atl_change_percentage.usd}, ${jsonData.atl_date.usd}, ${jsonData.market_cap.usd}, ${jsonData.total_volume.usd}, ${jsonData.high_24h.usd}, ${jsonData.low_24h.usd}, ${jsonData.price_change_24h}, ${jsonData.price_change_percentage_24h}, ${jsonData.price_change_percentage_7d}, ${jsonData.price_change_percentage_1y}, ${jsonData.last_updated}
              );`;

        existingCoin = await sql`SELECT id FROM coins WHERE name = ${coinName}`;
        console.log(existingCoin)
        return Response.json(existingCoin[0])
    }  catch (error) {
        return new Response(`Couldn't retrieve stored coins data: ${error}`, {
            status: 400,
        });
    }
}

// export async function PUT() {

// }

        // if (!res.ok) {
        //     throw new Error("Failed to fetch coin data");
        // } else {
        //     const jsonData = await res.json();
        //     let symbol = jsonData.symbol;
        //     let name = jsonData.name;
        //     let description = jsonData.description.en;
        //     let homepage = jsonData.links.homepage[0];
        //     let image = jsonData.image.large;
        //     let marketCapRank = jsonData.market_cap_rank;
        //     let price = jsonData.market_data.current_price.usd;
        //     let ath = jsonData.ath.usd;
        //     let athChangePercentage = jsonData.ath_change_percentage.usd;
        //     let athDate = jsonData.ath_date.usd;
        //     let atl = jsonData.atl.usd;
        //     let atlChangePercentage = jsonData.atl_change_percentage.usd;
        //     let atlDate = jsonData.atl_date.usd;
        //     let marketCap = jsonData.market_cap.usd;
        //     let totalVolume = jsonData.total_volume.usd;
        //     let high24h = jsonData.high_24h.usd;
        //     let low24h = jsonData.low_24h.usd;
        //     let priceChange24h = jsonData.price_change_24h;
        //     let priceChangePercentage24h = jsonData.price_change_percentage_24h;
        //     let priceChangePercentage7d = jsonData.price_change_percentage_7d;
        //     let priceChangePercentage1y = jsonData.price_change_percentage_1y;
        //     let updated = jsonData.last_updated;
        //     // console.log(symbol, name, description, homepage, image, marketCapRank, price, ath, athChangePercentage, athDate, atl, atlChangePercentage, atlDate, marketCap, totalVolume, high24h, low24h, priceChange24h, priceChangePercentage24h, priceChangePercentage7d, priceChangePercentage1y, updated)
        //     // console.log(jsonData)
        // }