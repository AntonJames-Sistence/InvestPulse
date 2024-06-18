import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const newsKey = process.env.NEWSDATA_KEY;

export const GET = async (req: NextRequest, res: NextResponse) => {

}

export const PUT = async (req: NextRequest, res: NextResponse) => {
    if (!newsKey) {
        return NextResponse.json({ message: 'Error while getting news, please ensure key is up to date' }, { status: 400 });
    }

    if (!process.env.DATABASE_URL) {
        return new Response(``, {
          status: 400,
          statusText: `Couldn't reach DB, please check your key`
        })
    }
    
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    const url = `https://newsdata.io/api/1/latest?apikey=${newsKey}&q=cryptocurrency&language=en`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch trending coins");
        }

        const data = await response.json();
        console.log(data)

        for (const article of data.results){
            const existingRecord = await sql`SELECT * FROM news WHERE article_id = ${article.article_id};`;
            if (existingRecord.length > 0) continue;

            await sql`
                INSERT INTO news (article_id, title, link, description, pub_date, image_url, source_url)
                VALUES (${article.article_id}, ${article.title}, ${article.link}, ${article.description}, ${article.pubDate}, ${article.image_url}, ${article.source_url});
            `;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error fetching data", error);
        return NextResponse.json({ message: 'Error while fetching data'}, {status: 500});
    }
}