import React, { useEffect, useState } from 'react';
import { Container, Card, CardContent, CardMedia, Typography, CircularProgress, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import ReusableTile from './ReusableTile';

interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

const NewsCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: `rgba(156, 39, 176, 0.1)`,
}));

const CardContentStyled = styled(CardContent)({
  display: '-webkit-box',
  WebkitLineClamp: 4,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const News: React.FC = () => {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleNewsCount, setVisibleNewsCount] = useState(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleLoadMore = () => {
    setVisibleNewsCount((prevCount) => prevCount + 3);
  };

  if (loading) {
    return (
      <Container className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Container>
    );
  }

  return (
      <ReusableTile title="Latest News">
        <Grid container spacing={4}>
          {news.slice(0, visibleNewsCount).map((article) => (
            <Grid item key={article.article_id} xs={12} sm={6} md={4}>
              <NewsCard>
                {article.image_url && (
                  <CardMedia
                    component="img"
                    alt={article.title}
                    height="140"
                    image={article.image_url}
                  />
                )}
                <CardContentStyled>
                  <Typography gutterBottom variant="h5" component="div">
                    {article.title}
                  </Typography>
                  <Typography variant="caption" display="block" gutterBottom>
                    {new Date(article.pub_date ?? '').toLocaleDateString()}
                  </Typography>
                  <a href={article.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Read more
                  </a>
                </CardContentStyled>
              </NewsCard>
            </Grid>
          ))}
        </Grid>
        {visibleNewsCount < news.length && (
          <div className="flex justify-center mt-4">
            <Button variant="contained" color="primary" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </ReusableTile>
  );
};

export default News;
