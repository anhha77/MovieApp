import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import apiService from "../app/apiService";
import MovieCard from "../components/MovieCard";
import useHandlePage from "../hooks/useHandlePage";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";
const urlToGetImages = "http://image.tmdb.org/t/p/w500";

const styledBtn = {
  width: { xs: "100%", sm: "200px" },
  bgcolor: "secondary.main",
  "&:hover": {
    bgcolor: "secondary.dark",
  },
};

function FilterPage() {
  let movieGenres = [];
  let TVGenres = [];

  if (window.localStorage.getItem("movieGenresList")) {
    movieGenres = window.localStorage.getItem("movieGenresList").split(",");
    movieGenres = movieGenres.map((item) => parseInt(item));
  }

  if (window.localStorage.getItem("TVGenresList")) {
    TVGenres = window.localStorage.getItem("TVGenresList").split(",");
    TVGenres = TVGenres.map((item) => parseInt(item));
  }

  const searchQuery = window.localStorage.getItem("searchQuery");

  const {
    pageMovie,
    setPageMovie,
    pageTV,
    setPageTV,
    moviesFilter,
    setMoviesFilter,
    TVFilter,
    setTVFilter,
    filterClick,
  } = useHandlePage();

  const queryGenresMovie = "";
  const queryGenresTV = "";

  const getDataBasedOnSearch = async (movieOrTV, page, searchQuery) => {
    try {
      const response = await apiService.get(
        `https://api.themoviedb.org/3/search/${movieOrTV}?query=${searchQuery}&page=${page}&api_key=${apiKey}`
      );
      if (movieOrTV === "movie") {
        if (movieGenres.length !== 0) {
          let filterResult = response["data"]["results"].filter((item) =>
            item["genre_ids"].some((i) => movieGenres.includes(i))
          );
          // console.log(filterResult);
          setMoviesFilter([...moviesFilter, ...filterResult]);
        }
        setMoviesFilter([...moviesFilter, ...response.data.results]);
      } else {
        if (TVGenres.length !== 0) {
          let filterResult = response["data"]["results"].filter((item) =>
            item["genre_ids"].some((i) => TVGenres.includes(i))
          );
          // console.log(filterResult);
          setTVFilter([...TVFilter, ...filterResult]);
        }
        setTVFilter([...TVFilter, ...response.data.results]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDataWithoutSearch = async (movieOrTV, page, queryGenres) => {
    try {
      const response = await apiService.get(
        `https://api.themoviedb.org/3/discover/${movieOrTV}?with_genres=${queryGenres}&page=${page}&api_key=${apiKey}`
      );
      if (movieOrTV === "movie") {
        setMoviesFilter([...moviesFilter, ...response.data.results]);
        console.log(response.data.results);
      } else {
        setTVFilter([...TVFilter, ...response.data.results]);
        console.log(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataMovie = () => {
    if (searchQuery) {
      getDataBasedOnSearch("movie", pageMovie, searchQuery);
    } else {
      if (movieGenres.length !== 0) {
        if (movieGenres.length === 1) {
          getDataWithoutSearch("movie", pageMovie, movieGenres[0]);
        } else {
          movieGenres.forEach((item, index) => {
            if (index !== 0) {
              queryGenresMovie.concat("%7C", item);
            } else {
              queryGenresMovie.concat("item");
            }
          });
          getDataWithoutSearch("movie", pageMovie, queryGenresMovie);
        }
      }
    }
  };

  const handleDataTV = () => {
    if (searchQuery) {
      getDataBasedOnSearch("tv", pageTV, searchQuery);
    } else {
      if (TVGenres.length !== 0) {
        if (TVGenres.length === 1) {
          getDataWithoutSearch("tv", pageTV, TVGenres[0]);
        } else {
          TVGenres.forEach((item, index) => {
            if (index !== 0) {
              queryGenresTV.concat("%7C", item);
            } else {
              queryGenresTV.concat("item");
            }
          });
          getDataWithoutSearch("tv", pageTV, queryGenresTV);
        }
      }
    }
  };

  useEffect(() => {
    handleDataMovie();
    console.log("1");
  }, [pageMovie, filterClick]);

  useEffect(() => {
    handleDataTV();
    console.log("2");
  }, [pageTV, filterClick]);

  return (
    <Box bgcolor="#000" flexGrow={1}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        bgcolor="rgb(18, 34, 45)"
        padding="28px 12px"
        color="#fff"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4">Filter Result</Typography>
      </Stack>
      <Container>
        <Typography
          variant="h6"
          color="#fff"
          borderBottom="1px solid #fff"
          gutterBottom={true}
          margin="30px 0px"
        >
          Movie Result
        </Typography>
        <Grid container spacing={2} maxWidth="lg">
          {moviesFilter.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: { xs: "flex", sm: "block" },
                justifyContent: "center",
              }}
            >
              <MovieCard
                imageURL={`${urlToGetImages}${item["backdrop_path"]}`}
                movieName={item["title"]}
                movieOrTVID={item["id"]}
                movieOrTV="movie"
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}
        >
          <Button
            variant="contained"
            sx={styledBtn}
            onClick={() => setPageMovie(pageMovie + 1)}
          >
            Load more
          </Button>
        </Box>

        <Typography
          variant="h6"
          color="#fff"
          borderBottom="1px solid #fff"
          gutterBottom={true}
          margin="30px 0px"
        >
          TV Result
        </Typography>
        <Grid container spacing={2} maxWidth="lg">
          {TVFilter.map((item, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              sx={{
                display: { xs: "flex", sm: "block" },
                justifyContent: "center",
              }}
            >
              <MovieCard
                imageURL={`${urlToGetImages}${item["backdrop_path"]}`}
                movieName={item["name"]}
                movieOrTVID={item["id"]}
                movieOrTV="tv"
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", margin: "20px 0px" }}
        >
          <Button
            variant="contained"
            sx={styledBtn}
            onClick={() => setPageTV(pageTV + 1)}
          >
            Load more
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default FilterPage;
