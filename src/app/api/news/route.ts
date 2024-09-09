import { NextRequest, NextResponse } from 'next/server';
import postgres from 'postgres';
import { isRelevantArticle } from '../../utils/newsFilter';

// const newsKey = process.env.NEWSDATA_KEY;
const placeholderImages = [
  'https://i.ibb.co/R34fRP2/crpto.webp',
  'https://i.ibb.co/0rgx9gB/Cryptocurrency-Photo-by-stockphoto-graf.webp',
];

// Function to get a random placeholder image
const getRandomPlaceholderImage = () => {
  const randomIndex = Math.floor(Math.random() * placeholderImages.length);
  return placeholderImages[randomIndex];
};

interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

export const GET = async () => {
  // if (!process.env.DATABASE_URL) {
  //   return NextResponse.json({ message: "Couldn't reach DB" }, { status: 500 });
  // }

  // // Get the size parameter from the query string
  // const { searchParams } = new URL(req.url);
  // const size = searchParams.get('size');
  // // Connect to DB
  // const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });

  // // Fetch the news articles with the limit if size is provided, else fetch all
  // let news: NewsData[];
  // if (size && Number.isInteger(parseInt(size)) && parseInt(size) > 0) {
  //   news = await sql<
  //     NewsData[]
  //   >`SELECT * FROM news ORDER BY pub_date DESC LIMIT ${size};`;
  // } else {
  //   news = await sql<NewsData[]>`SELECT * FROM news ORDER BY pub_date DESC;`;
  // }

  // return Response.json(news);
    const api_token = process.env.MARKETAUX_API_TOKEN; // Store your API key securely in environment variables
    const url = `https://api.marketaux.com/v1/news/all?symbols=TSLA,NVDA,MSFT,META,AAPL&filter_entities=true&language=en&api_token=${api_token}`;
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`);
      }
  
      const news = await response.json();
      
      return NextResponse.json(news); // Return the fetched news as a JSON response
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
};

// export async function POST() {
//   if (!process.env.DATABASE_URL) {
//     return NextResponse.json({ message: "Couldn't reach DB" }, { status: 500 });
//   }

//   const sql = postgres(process.env.DATABASE_URL, { ssl: 'require' });
//   const url = `https://newsdata.io/api/1/latest?apikey=${newsKey}&q=cryptocurrency&language=en`;

//   const response = await fetch(url);

//   if (!response.ok) {
//     throw new Error('Failed to fetch trending coins');
//   }

//   const data = await response.json();

//   for (const article of data.results) {
//     // Make sure we have title, description and link to the article
//     if (!article.title || !article.description || !article.link) continue;

//     // Check if the article is relevant based on the keywords
//     if (!isRelevantArticle(article.title, article.description)) continue;

//     // Make sure uniqueness of the article, by title, because id doesn't guarantee it
//     const existingRecord =
//       await sql`SELECT * FROM news WHERE title = ${article.title};`;
//     if (existingRecord.length > 0) continue;

//     // Check if image is available and it starts with https enabling usage of next/image if not, use the placeholder image
//     const imageUrl =
//       article.image_url && article.image_url.startsWith('https')
//         ? article.image_url
//         : getRandomPlaceholderImage();

//     // Insert only when all requirements are fulfilled
//     await sql`
//                 INSERT INTO news (article_id, title, link, description, pub_date, image_url, source_url)
//                 VALUES (${article.article_id}, ${article.title}, ${article.link}, ${article.description}, ${article.pubDate}, ${imageUrl}, ${article.source_url});
//             `;
//   }

//   return NextResponse.json({ message: 'News are up to date' }, { status: 200 });
// }
