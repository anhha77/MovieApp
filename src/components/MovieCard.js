import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFavorite from "../hooks/useFavorite";

const styleCardContent = {
  position: "absolute",
  height: "100%",
  width: "100%",
  opacity: "0",
  transition: "all 0.3s ease-in-out",
  transitionDelay: "0.3s",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
  color: "#fff",
  "&:hover": {
    opacity: "1",
  },
};

const styleCardMedia = {
  width: "100%",
  height: "100%",
  position: "absolute",
  transition: "all 0.3s ease-in-out",
  transitionDelay: "0.3s",
  "&:hover": {
    filter: "brightness(80%)",
  },
};

const styleBtn = {
  width: { xs: "90%", md: "200px" },
  backgroundColor: "secondary.main",
  color: "#fff",
  margin: "5px 0px",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
};

const urlToGetImages = "http://image.tmdb.org/t/p/w500";

export default function MovieCard({
  imageURL,
  movieName,
  movieOrTVID,
  movieOrTV,
}) {
  const location = useLocation();

  const { itemFavorite, setItemFavorite, setDevice } = useFavorite();

  const url =
    movieOrTV === "movie"
      ? `/movies/movieDetailModal/${movieOrTVID}`
      : `/TV/TVDetailModal/${movieOrTVID}`;

  return (
    <Card sx={{ width: 345, height: 250, position: "relative" }}>
      <CardMedia
        sx={styleCardMedia}
        image={`${urlToGetImages}${imageURL}`}
        title="green iguana"
      >
        <CardActions sx={styleCardContent}>
          <Typography variant="h6" textAlign="center">
            {movieName}
          </Typography>
          <Button
            variant="contained"
            sx={styleBtn}
            onClick={() => {
              if (!itemFavorite.includes(movieOrTVID)) {
                setItemFavorite([...itemFavorite, movieOrTVID]);
              }

              setDevice(movieOrTV === "movie" ? "movie" : "tv");
            }}
          >
            Favorite
            <FavoriteIcon sx={{ marginLeft: "15px" }} />
          </Button>
          <Button variant="contained" sx={styleBtn}>
            <Link
              to={url}
              state={{ background: location }}
              style={{
                textDecoration: "none",
                color: "#fff",
                width: "100%",
              }}
            >
              View
            </Link>
          </Button>
        </CardActions>
      </CardMedia>
    </Card>
  );
}
