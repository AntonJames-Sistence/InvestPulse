import React from "react";
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Link,
  Box,
} from "@mui/material";
import { truncateText } from "../../utils/truncateText";

export interface NewsData {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string | null;
  image_url: string | null;
  source_url: string | null;
}

interface NewsProps {
  newsData: NewsData[];
}

const News: React.FC<NewsProps> = ({ newsData }) => {
  if (!newsData) {
    return (
      <Container>
        <div className="mt-24 mb-8 self-center flex justify-center">
          <Typography variant="h6">No news data available</Typography>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-24 mb-8">
      <Grid container spacing={4}>
        {newsData.map((article: NewsData) => (
          <Grid item key={article.article_id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                width: "100%",
                height: "500px",
                display: "flex",
                flexDirection: "column",
                borderRadius: (theme) => theme.shape.borderRadius,
                justifyContent: "space-between",
                boxShadow: (theme) => theme.shadows[1],
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: (theme) => theme.shadows[4],
                },
              }}
            >
              {article.image_url && (
                <CardMedia
                  component="img"
                  alt={article.title}
                  sx={{ height: "200px", width: "100%", objectFit: "cover" }}
                  image={article.image_url}
                />
              )}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Typography gutterBottom variant="h6" component="div">
                  {truncateText(article.title, 100)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {truncateText(article.description, 150)}
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
      </Grid>
    </Container>
  );
};

export default News;
