import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getMoviesAndTVList } from "../hooks/useGetMoviesAndTV";
import LoadingScreen from "../components/LoadingScreen";
import MovieCard from "../components/MovieCard";
import Carousel from "react-elastic-carousel";

const backgroundStyledSliderOne = {
  paddingTop: "32.03125%",
  backgroundImage: `url(https://streamo.vuejstemplate.com/images/slider/slider-hm4-4.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top left",
  backgroundSize: "cover",
  backgroundColor: "#b3b3b3",
  backgroundBlendMode: "mutiply",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  transitionDelay: "0.3s",
  "&:hover": {
    filter: "brightness(80%)",
    transform: "scale(1.2)",
  },
};

const backgroundStyledSliderTwo = {
  paddingTop: "32.03125%",
  backgroundImage: `url(https://streamo.vuejstemplate.com/images/slider/slider-hm4-3.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top left",
  backgroundSize: "cover",
  backgroundColor: "#b3b3b3",
  backgroundBlendMode: "mutiply",
  position: "relative",
  transition: "all 0.3s ease-in-out",
  transitionDelay: "0.3s",
  "&:hover": {
    filter: "brightness(80%)",
    transform: "scale(1.2)",
  },
};

const backGroundStyledThree = {
  paddingTop: "32.03125%",
  backgroundImage: `url(https://streamo.vuejstemplate.com/images/slider/series-2.png)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "top left",
  backgroundSize: "cover",
  backgroundColor: "#b3b3b3",
  backgroundBlendMode: "mutiply",
  transition: "all 0.3s ease-in-out",
  transitionDelay: "0.3s",
  "&:hover": {
    filter: "brightness(80%)",
    transform: "scale(1.2)",
  },
};

const breakPoints = [
  { width: 1, itemsToShow: 1, pagination: false },
  { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
  { width: 1035, itemsToShow: 3, pagination: false },
  { width: 1200, itemsToShow: 4, pagination: false },
];

const breakPointsSlider = [{ width: 1, itemsToShow: 1, pagination: false }];

function HomePage() {
  const [upComingMoviesResult, setUpComingMoviesResult] = useState([]);
  const [topRatedMoviesResult, setTopRatedMoviesResult] = useState([]);
  const [popularMoviesResult, setPopularMoviesResult] = useState([]);
  const [nowPlayingMoviesResult, setNowPlayingMoviesResult] = useState([]);

  const [airingTodayTVResult, setAiringTodayTVResult] = useState([]);
  const [onTheAirTVResult, setOnTheAirTVResult] = useState([]);
  const [popularTVResult, setPopularTVResult] = useState([]);
  const [topRatedTVResult, setTopRatedTVResult] = useState([]);

  // const getMovieGenres = (item) => {
  //   const result = movieGenres["genres"].find((i) => i.id === item);
  //   return result.name;
  // };

  useEffect(() => {
    const getDataUpMovieComing = async () => {
      try {
        const result = await getMoviesAndTVList("upcoming", "movie");
        if (result.length !== 0) {
          setUpComingMoviesResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataMovieTopRated = async () => {
      try {
        const result = await getMoviesAndTVList("top_rated", "movie");
        if (result.length !== 0) {
          setTopRatedMoviesResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataMoviePopular = async () => {
      try {
        const result = await getMoviesAndTVList("popular", "movie");
        if (result.length !== 0) {
          setPopularMoviesResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataMovieNowPlaying = async () => {
      try {
        const result = await getMoviesAndTVList("now_playing", "movie");
        if (result.length !== 0) {
          setNowPlayingMoviesResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataTVAiringToday = async () => {
      try {
        const result = await getMoviesAndTVList("airing_today", "tv");
        if (result.length !== 0) {
          setAiringTodayTVResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataTVOnTheAir = async () => {
      try {
        const result = await getMoviesAndTVList("on_the_air", "tv");
        if (result.length !== 0) {
          setOnTheAirTVResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataTVPopular = async () => {
      try {
        const result = await getMoviesAndTVList("popular", "tv");
        if (result.length !== 0) {
          setPopularTVResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getDataTVTopRated = async () => {
      try {
        const result = await getMoviesAndTVList("top_rated", "tv");
        if (result.length !== 0) {
          setTopRatedTVResult(result);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getDataUpMovieComing();
    getDataMovieTopRated();
    getDataMoviePopular();
    getDataMovieNowPlaying();

    getDataTVAiringToday();
    getDataTVOnTheAir();
    getDataTVPopular();
    getDataTVTopRated();
  }, []);

  if (upComingMoviesResult.length !== 0) {
    return (
      <Box sx={{ bgcolor: "#000" }}>
        <Carousel breakPoints={breakPointsSlider}>
          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box sx={backgroundStyledSliderOne}></Box>
          </Box>

          <Box sx={{ overflow: "hidden", width: "100%" }}>
            <Box sx={backgroundStyledSliderTwo}></Box>
          </Box>
        </Carousel>

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Upcoming Movies
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {upComingMoviesResult.map((item, index) => (
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

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Top Rated Movies
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {topRatedMoviesResult.map((item, index) => (
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

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Popular Movies
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {popularMoviesResult.map((item, index) => (
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

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Now Playing Movies
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {nowPlayingMoviesResult.map((item, index) => (
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

        <Box sx={{ marginTop: "20px", overflow: "hidden" }}>
          <Box sx={backGroundStyledThree}></Box>
        </Box>

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Airing Today TV
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {airingTodayTVResult.map((item, index) => (
                <MovieCard
                  imageURL={item["backdrop_path"]}
                  movieName={item["name"]}
                  key={index}
                  movieOrTVID={item["id"]}
                  movieOrTV="TV"
                />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            On The Air TV
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {onTheAirTVResult.map((item, index) => (
                <MovieCard
                  imageURL={item["backdrop_path"]}
                  movieName={item["name"]}
                  key={index}
                  movieOrTVID={item["id"]}
                  movieOrTV="TV"
                />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Popular TV
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {popularTVResult.map((item, index) => (
                <MovieCard
                  imageURL={item["backdrop_path"]}
                  movieName={item["name"]}
                  key={index}
                  movieOrTVID={item["id"]}
                  movieOrTV="TV"
                />
              ))}
            </Carousel>
          </Box>
        </Box>

        <Box sx={{ padding: "50px 40px 0px" }}>
          <Typography
            gutterBottom={true}
            variant="h6"
            sx={{
              borderBottom: "1px solid rgba(255 ,255, 255, 0.25)",
              color: "#fff",
            }}
          >
            Top Rated TV
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <Carousel breakPoints={breakPoints}>
              {topRatedTVResult.map((item, index) => (
                <MovieCard
                  imageURL={item["backdrop_path"]}
                  movieName={item["name"]}
                  key={index}
                  movieOrTVID={item["id"]}
                  movieOrTV="TV"
                />
              ))}
            </Carousel>
          </Box>
        </Box>
      </Box>
    );
  }
  return <LoadingScreen />;
}

export default HomePage;
