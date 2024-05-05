import { type NextResponse } from 'next/server';
import postgres from 'postgres';

const formatCoinName = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export async function GET() {
    let coinName = 'bitcoin'; // change to request coinName
    const url = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=true`;
    if (!process.env.DATABASE_URL) {
        return new Response('', {
          status: 400,
          statusText: 'DATABASE_URL environment variable is not defined'
        })
    }

    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

    try {
        let existingCoin = await sql`SELECT * FROM coins WHERE name = ${formatCoinName(coinName)}`;
        
        if (existingCoin.length > 0) {
            // Check if last_updated is more than 24 hours ago
            const lastUpdated = existingCoin[0].last_updated;
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
            if (lastUpdated > twentyFourHoursAgo) {
                // Coin data is up to date, return it
                return Response.json(existingCoin[0])
            } else {
                // Fetch data from Coingecko API
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error("Failed to fetch coin data");
                }
                const jsonData = await res.json();

                // Update data in database
                await sql`
                    UPDATE coins 
                    SET symbol = ${jsonData.symbol}, 
                        name = ${jsonData.name}, 
                        description = ${jsonData.description.en}, 
                        homepage = ${jsonData.links.homepage[0]}, 
                        image = ${jsonData.image.large}, 
                        market_cap_rank = ${jsonData.market_cap_rank}, 
                        current_price = ${jsonData.market_data.current_price.usd}, 
                        ath = ${jsonData.market_data.ath.usd}, 
                        ath_change_percentage = ${jsonData.market_data.ath_change_percentage.usd}, 
                        ath_date = ${jsonData.market_data.ath_date.usd}, 
                        atl = ${jsonData.market_data.atl.usd}, 
                        atl_change_percentage = ${jsonData.market_data.atl_change_percentage.usd}, 
                        atl_date = ${jsonData.market_data.atl_date.usd}, 
                        market_cap = ${jsonData.market_data.market_cap.usd}, 
                        total_volume = ${jsonData.market_data.total_volume.usd}, 
                        high_24h = ${jsonData.market_data.high_24h.usd}, 
                        low_24h = ${jsonData.market_data.low_24h.usd}, 
                        price_change_24h = ${jsonData.market_data.price_change_24h}, 
                        price_change_percentage_24h = ${jsonData.market_data.price_change_percentage_24h}, 
                        price_change_percentage_7d = ${jsonData.market_data.price_change_percentage_7d}, 
                        price_change_percentage_1y = ${jsonData.market_data.price_change_percentage_1y}, 
                        last_updated = ${jsonData.last_updated}
                    WHERE name = ${formatCoinName(coinName)}
                `;
                
                existingCoin = await sql`SELECT * FROM coins WHERE name = ${formatCoinName(coinName)}`;
                return Response.json(existingCoin[0]);
            }
        } else {
            // Fetch data from Coingecko API
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch coin data");
            }
            const jsonData = await res.json();

            // Put data into database
            await sql`
                INSERT INTO coins (symbol, name, description, homepage, image, market_cap_rank, current_price, ath, ath_change_percentage, ath_date, atl, atl_change_percentage, atl_date, market_cap, total_volume, high_24h, low_24h, price_change_24h, price_change_percentage_24h, price_change_percentage_7d, price_change_percentage_1y, last_updated)
                VALUES (${jsonData.symbol}, ${jsonData.name}, ${jsonData.description.en}, ${jsonData.links.homepage[0]}, ${jsonData.image.large}, ${jsonData.market_cap_rank}, ${jsonData.market_data.current_price.usd}, ${jsonData.market_data.ath.usd}, ${jsonData.market_data.ath_change_percentage.usd}, ${jsonData.market_data.ath_date.usd}, ${jsonData.market_data.atl.usd}, ${jsonData.market_data.atl_change_percentage.usd}, ${jsonData.market_data.atl_date.usd}, ${jsonData.market_data.market_cap.usd}, ${jsonData.market_data.total_volume.usd}, ${jsonData.market_data.high_24h.usd}, ${jsonData.market_data.low_24h.usd}, ${jsonData.market_data.price_change_24h}, ${jsonData.market_data.price_change_percentage_24h}, ${jsonData.market_data.price_change_percentage_7d}, ${jsonData.market_data.price_change_percentage_1y}, ${jsonData.last_updated}
                );`;

            existingCoin = await sql`SELECT * FROM coins WHERE name = ${formatCoinName(coinName)}`;
            // console.log(existingCoin)
            return Response.json(existingCoin[0])
        }
    }  catch (error) {
        return new Response('', {
            status: 400,
            statusText: `Couldn't retrieve stored coins data: ${error}`
        });
    }
}

// export async function PUT() {

// }

        
// console.log("Symbol:", jsonData.symbol);
// console.log("Name:", jsonData.name);
// console.log("Description:", jsonData.description.en);
// console.log("Homepage:", jsonData.links.homepage[0]);
// console.log("Image:", jsonData.image.large);
// console.log("Market Cap Rank:", jsonData.market_cap_rank);
// console.log("Current Price:", jsonData.market_data.current_price.usd);
// console.log("ATH:", jsonData.market_data.ath.usd);
// console.log("ATH Change Percentage:", jsonData.market_data.ath_change_percentage.usd);
// console.log("ATH Date:", jsonData.market_data.ath_date.usd);
// console.log("ATL:", jsonData.market_data.atl.usd);
// console.log("ATL Change Percentage:", jsonData.market_data.atl_change_percentage.usd);
// console.log("ATL Date:", jsonData.market_data.atl_date.usd);
// console.log("Market Cap:", jsonData.market_data.market_cap.usd);
// console.log("Total Volume:", jsonData.market_data.total_volume.usd);
// console.log("High 24h:", jsonData.market_data.high_24h.usd);
// console.log("Low 24h:", jsonData.market_data.low_24h.usd);
// console.log("Price Change 24h:", jsonData.market_data.price_change_24h);
// console.log("Price Change Percentage 24h:", jsonData.market_data.price_change_percentage_24h);
// console.log("Price Change Percentage 7d:", jsonData.market_data.price_change_percentage_7d);
// console.log("Price Change Percentage 1y:", jsonData.market_data.price_change_percentage_1y);
// console.log("Last Updated:", jsonData.last_updated);