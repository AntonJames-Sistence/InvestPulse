import { NextResponse } from "next/server";
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const conn = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: "require",
});

// export async function GET() {
//     const facebookRef = ref(DB, "trending_coins");

//     try {
//       const snapshot = await get(facebookRef);

//       if (snapshot.exists()) {
//         const allPost = Object.values(snapshot.val());
//         return NextResponse.json(allPost);
//       }
//       throw new Error("No Facebook post");
//     } catch (error) {
//       return NextResponse.error("No post yet");
//     } finally {
//       off(facebookRef);
//     }
//   }

  export async function PUT() {
    const url = 'https://api.coingecko.com/api/v3/search/trending';
  
    try {
      const res = await fetch(url);
  
      if (!res.ok) {
        throw new Error("Failed to fetch trending coins");
      }

      const jsonData = await res.json();

      // console.log(jsonData)
      console.log(conn.query("SELECT * FROM hello_world"))
  
      // const coinsData = await res.json();

      // const trendingCoinsCollection = db.collection('trending_coins');
  
      // trendingCoinsCollection.insert(coinsData);

      return NextResponse.json("Successfully updated data");
    } catch (error) {
      return NextResponse.error("Couldn't retrieve trending coins data");
    }
  }