import React, { useEffect, useState } from "react";
import {
  Skeleton,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
  Box,
} from "@mui/material";
import Image from "next/image";
import ReusableTile from "./ReusableTile";

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
const CACHE_EXPIRY = 20 * 60 * 60 * 1000; // 20 hours in milliseconds

const HomePageNews: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to get data from local storage first
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        setNewsData(data);
        setLoading(false);
        return;
      }
    }
    // Fetch data from the server
    getNewsData();
  });

  const getNewsData = async () => {
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
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() })
      );
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
            <Box key={idx} display="flex" flexDirection="column" p={1}>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width="100%"
                height={200}
                sx={{ mb: 2 }}
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
                height={20}
                sx={{ mt: "auto" }}
              />
            </Box>
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
                flexDirection: "row",
                borderRadius: (theme) => theme.shape.borderRadius,
                boxShadow: (theme) => theme.shadows[1],
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              {article.image_url && (
                <Image
                  className="object-cover"
                  alt={article.title}
                  src={article.image_url}
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
                    marginTop: "auto",
                  }}
                >
                  <Link
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                  >
                    Read more
                  </Link>
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
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ m: "auto", borderRadius: "10px" }}
            // startIcon={}
          >
            Go to News Page
          </Button>
        </Box>
      </Grid>
    </ReusableTile>
  );
};

export default HomePageNews;
