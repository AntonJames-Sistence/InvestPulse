'use client';

import React, { useEffect, useState } from 'react';
import { FaNewspaper } from 'react-icons/fa6';
import Link from 'next/link';
import {
  Skeleton,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import ReusableTile from './ReusableTile';
import Image from 'next/image';
import { NewsData } from '../types/NewsDataInterface';

const HomePageNews: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the server
    getNewsData();
  }, []);

  const getNewsData = async () => {
    // Fetch news and limit size to 3
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}/api/news`, {
        next: { revalidate: 43200 },
        // cache: 'no-store',
      });

      if (!response.ok) return null;
      const data = await response.json();
      setNewsData(data.slice(0, 3));
    } catch (error) {
      console.error(`Couldn't get news data ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReusableTile title="Loading News">
        <Grid container spacing={4} direction="column">
          {Array.from(new Array(3)).map((_, idx) => (
            <Grid item key={idx}>
              <Box
                display="flex"
                flexDirection="column"
                p={1}
                sx={{
                  borderRadius: 5,
                  borderTop: '1px solid rgba(0, 0, 0, 0.12)',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                  height: '400px',
                }}
              >
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="100%"
                  height={200}
                  sx={{ mb: 2, borderRadius: 10 }}
                />
                <Skeleton
                  animation="wave"
                  width="60%"
                  height={40}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  animation="wave"
                  width="80%"
                  height={20}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  animation="wave"
                  width="80%"
                  height={20}
                  sx={{ mb: 1 }}
                />
                <Skeleton
                  animation="wave"
                  width="40%"
                  height={30}
                  sx={{ mt: 'auto', alignSelf: 'self-end' }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Latest News">
      <Grid container spacing={4} direction="column">
        {newsData.map((article: NewsData) => (
          <Grid item key={article.title}>
            <Card
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 10,
                justifyContent: 'space-between',
                transition: 'box-shadow 0.3s ease-in-out',
              }}
            >
              {article.imageUrl && (
                <Image
                  className="h-48 w-full object-cover"
                  alt={article.title}
                  src={article.imageUrl}
                  height={200}
                  width={400}
                />
              )}
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2, // Adjust the number of lines to truncate here
                  }}
                >
                  {article.title}
                </Typography>
                <Divider orientation="horizontal" sx={{ my: 2 }} flexItem />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  sx={{
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 4, // Adjust the number of lines to truncate here
                  }}
                >
                  {article.description}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    marginTop: 4,
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="textSecondary">
                      {article.source}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{ display: 'block', fontWeight: 'bold' }}
                    >
                      {article.fetchedAt}
                    </Typography>
                  </Box>
                  <MuiLink
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </MuiLink>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link href="/news" passHref>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ m: 'auto', borderRadius: '10px' }}
            startIcon={<FaNewspaper />}
          >
            View All News
          </Button>
        </Link>
      </Box>
    </ReusableTile>
  );
};

export default HomePageNews;
