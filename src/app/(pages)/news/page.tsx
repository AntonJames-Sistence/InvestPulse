import React from 'react';
import News, { NewsData } from '../../components/News';

async function fetchNewsData(): Promise<NewsData[]> {
  const response = await fetch('/api/news', {
    next: { revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch news data');
  }

  const data: NewsData[] = await response.json();
  return data;
}

const NewsPage = async () => {
  let newsData: NewsData[] = [];

  try {
    newsData = await fetchNewsData();
  } catch (error) {
    console.error(error);
  }

  return <News newsData={newsData} />;
};

export default NewsPage;
