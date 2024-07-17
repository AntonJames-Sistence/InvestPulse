import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
  Box,
} from "@mui/material";
import Image from "next/image";

interface NewsData {
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

const HomePageNews: React.FC<NewsProps> = ({ newsData }) => {
  if (!newsData) {
    return (
        <div className="flex flex-col w-full bg-white rounded-lg p-2 lg:p-8 mb-4 lg:mb-8">
          <Typography variant="h6">No news available</Typography>
        </div>
    );
  }

  return (
    <Container>
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
                <Image
                  className="h-48 w-full object-cover"
                  alt={article.title}
                  src={article.image_url}
                  height={200}
                  width={400}
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
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: 2, // Adjust the number of lines to truncate here
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
                    WebkitLineClamp: 3, // Adjust the number of lines to truncate here
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
      </Grid>
    </Container>
  );
};

export default HomePageNews;
