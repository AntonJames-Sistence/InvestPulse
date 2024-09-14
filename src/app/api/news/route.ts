import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWSDATA_API_KEY; // Store your API key in an environment variable for security
  const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=finance&country=us`;

  try {
    // Fetch the news data from NewsData.io
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json({ message: 'No news articles found.' });
    }

    // Extract news items and format them
    const newsItems = data.results.map((article) => ({
      title: article.title,
      link: article.link,
      description: article.description || '',
      source: article.source_id || 'Unknown Source',
      fetchedAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    }));

    // Return the fetched and formatted news items as JSON
    return NextResponse.json(newsItems);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
