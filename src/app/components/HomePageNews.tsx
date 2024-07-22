'use client';

import React, { useEffect, useState } from "react";
import { FaNewspaper } from "react-icons/fa6";
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
} from "@mui/material";
import { Link as MuiLink } from '@mui/material';
import ReusableTile from "./ReusableTile";
import { setCache, getCache } from "../utils/cacheUtils";
import ImageWithFallback from "../utils/ImageWithFallback";

interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

const CACHE_KEY = "newsDataCache";
const CACHE_EXPIRY = 6 * 60 * 60 * 1000; // 6 hours in milliseconds

const HomePageNews: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get data from local storage first
    const cachedNewsData = getCache<NewsData[]>(CACHE_KEY, CACHE_EXPIRY);
    if (cachedNewsData) {
      setNewsData(cachedNewsData);
      setLoading(false);
      return;
    }
    // Fetch data from the server
    getNewsData();
  }, []);

  const getNewsData = async () => {
    // Fetch news and limit size to 3
    try {
      const response = await fetch(`/api/news?size=3`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setNewsData(data);
      // Caching to local storage
      setCache(CACHE_KEY, data, CACHE_EXPIRY)
    } catch (error) {
      console.error("Couldn't get news data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReusableTile title="Hot News">
        <Grid container spacing={4} direction="column">
          {Array.from(new Array(3)).map((_, idx) => (
            <Grid item key={idx}>
              <Box
                display="flex"
                flexDirection="column"
                p={1}
                sx={{
                  borderRadius: 5,
                  border: "1px solid rgba(0, 0, 0, 0.12)",
                  height: "400px",
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
                  sx={{ mt: "auto", alignSelf: "self-end" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </ReusableTile>
    );
  }

  return (
    <ReusableTile title="Hot News">
      <Grid container spacing={4} direction="column">
        {newsData.map((article: NewsData) => (
          <Grid item key={article.article_id}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {article.image_url && (
                <ImageWithFallback
                  className="h-48 w-full object-cover"
                  alt={article.title}
                  src={article.image_url}
                  fallbackSrc={"https://i.ibb.co/R34fRP2/crpto.webp"}
                  height={200}
                  width={200}
                />
              )}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2,
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
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 3,
                  }}
                >
                  {article.description}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginTop: "1rem",
                  }}
                >
                  <MuiLink
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </MuiLink>
                  <Typography
                    sx={{
                      color: (theme) => theme.palette.text.secondary,
                      alignSelf: "flex-end",
                    }}
                  >
                    {new Date(article.pub_date ?? "").toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link href="/news" passHref>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ m: "auto", borderRadius: "10px" }}
            startIcon={<FaNewspaper />}
          >
            News Page
          </Button>
        </Link>
      </Box>
    </ReusableTile>
  );
};

export default HomePageNews;
