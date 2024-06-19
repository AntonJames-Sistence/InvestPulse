import { NextRequest, NextResponse } from "next/server";
import postgres from "postgres";

const newsKey = process.env.NEWSDATA_KEY;
const placeholderImage = 'https://i.ibb.co/0rgx9gB/Cryptocurrency-Photo-by-stockphoto-graf.webp';

interface NewsData {
    article_id: string;
    title: string;
    link: string;
    description: string | null;
    pub_date: string | null;
    image_url: string | null;
    source_url: string | null;
}

export const GET = async (req: NextRequest, res: NextResponse) => {
    if (!process.env.DATABASE_URL) {
        return new Response(``, {
          status: 400,
          statusText: `Couldn't reach DB, please check your key`
        })
    }
    
    const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
    
    try {
        // Fetch all stored news articles from the database
        const news: NewsData[] = await sql<NewsData[]>`SELECT * FROM news ORDER BY pub_date DESC;`;
    
        return Response.json(news);
    } catch (error) {
        return new Response('', {
          status: 400,
          statusText: `Couldn't retrieve stored coins data, ${error}`
        });
    }
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

        for (const article of data.results){
            // Make sure we have title, description and link to the article
            if (!article.title || !article.description || !article.link) continue;

            // Make sure uniqueness of the article
            const existingRecord = await sql`SELECT * FROM news WHERE article_id = ${article.article_id};`;
            if (existingRecord.length > 0) continue;

            // Check if image is available, if not, use the placeholder image
            const imageUrl = article.image_url ? article.image_url : placeholderImage;

            await sql`
                INSERT INTO news (article_id, title, link, description, pub_date, image_url, source_url)
                VALUES (${article.article_id}, ${article.title}, ${article.link}, ${article.description}, ${article.pubDate}, ${imageUrl}, ${article.source_url});
            `;
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error fetching data", error);
        return NextResponse.json({ message: 'Error while fetching data'}, {status: 500});
    }
}