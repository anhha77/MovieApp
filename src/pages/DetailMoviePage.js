import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../app/apiService";
import LoadingScreen from "../components/LoadingScreen";
import { Box, Container, Stack, Typography } from "@mui/material";
import Carousel from "react-elastic-carousel";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import MovieCard from "../components/MovieCard";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";
const urlToGetImages = "http://image.tmdb.org/t/p/w500";

const breakPointsSlider = [{ width: 1, itemsToShow: 1, pagination: false }];

const breakPoints = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 1035, itemsToShow: 3, pagination: false },
  { width: 1200, itemsToShow: 4, pagination: false },
];

function DetailMoviePage() {
  const params = useParams();
  const movieID = params.id;

  const [movieDetail, setMovieDetail] = useState(null);
  const [movieSimilar, setMovieSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDataMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}`
        );
        setMovieDetail(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    const getDataMovieSimilar = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${apiKey}`
        );
        console.log("hi", response.data.results);
        setMovieSimilar(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    getDataMovieDetail();
    getDataMovieSimilar();
  }, [movieID]);

  return (
    <Box bgcolor="#000" flexGrow={1}>
      {!movieDetail ? (
        <LoadingScreen />
      ) : (
        <Stack spacing={3}>
          <Box>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={2}
              bgcolor="rgb(18, 34, 45)"
              padding="28px 12px"
              color="#fff"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4">{movieDetail["title"]}</Typography>
              <Stack
                spacing={2}
                direction="row"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Typography variant="p">
                  {movieDetail["runtime"]} Minutes
                </Typography>
                {movieDetail["genres"].map((item, index) => (
                  <Typography variant="p" key={index}>
                    {item.name}
                  </Typography>
                ))}
              </Stack>
            </Stack>
          </Box>
          <Container sx={{ alignSelf: "center" }}>
            <Carousel breakPoints={breakPointsSlider}>
              <Box
                sx={{
                  width: "100%",
                  backgroundImage: `url(${urlToGetImages}${movieDetail["backdrop_path"]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  height: {
                    xs: "300px",
                    sm: "400px",
                    md: "500px",
                    lg: "600px",
                  },
                }}
              ></Box>
              <Box
                sx={{
                  width: "100%",
                  backgroundImage: `url(${urlToGetImages}${movieDetail["poster_path"]})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center center",
                  height: {
                    xs: "300px",
                    sm: "400px",
                    md: "500px",
                    lg: "600px",
                  },
                }}
              ></Box>
            </Carousel>
            <Stack spacing={3} padding="20px 60px" color="#fff">
              <Stack spacing={2} color="#fff" direction="row">
                <Typography variant="h6" color="secondary.main">
                  Release Date:{" "}
                </Typography>
                <Typography variant="h6">
                  {movieDetail["release_date"]}
                </Typography>
              </Stack>
              <Typography variant="p">{movieDetail["tagline"]}</Typography>
              <Typography variant="p">{movieDetail["overview"]}</Typography>
              <Box
                sx={{
                  borderTop: "1px solid #fff",
                  borderBottom: "1px solid #fff",
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box padding="10px 0px">
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Typography variant="h6" color="secondary.main">
                        Share:
                      </Typography>
                      <FacebookIcon />
                      <TwitterIcon />
                      <LinkedInIcon />
                    </Stack>
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <ThumbUpAltIcon />
                    <ThumbDownAltIcon />
                  </Stack>
                </Stack>
              </Box>

              <Box sx={{ padding: "50px 0px" }}>
                <Typography
                  gutterBottom={true}
                  variant="h6"
                  sx={{
                    borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
                    color: "#fff",
                  }}
                >
                  You May Also Like
                </Typography>
                <Box sx={{ marginTop: "20px" }}>
                  <Carousel breakPoints={breakPoints}>
                    {movieSimilar.map((item, index) => (
                      <MovieCard
                        imageURL={item["backdrop_path"]}
                        movieName={item["title"]}
                        key={index}
                        movieOrTVID={item["id"]}
                        movieOrTV="movie"
                      />
                    ))}
                  </Carousel>
                </Box>
              </Box>
            </Stack>
          </Container>
        </Stack>
      )}
    </Box>
  );
}

export default DetailMoviePage;
