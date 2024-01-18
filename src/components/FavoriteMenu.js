import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import apiService from "../app/apiService";
import useFavorite from "../hooks/useFavorite";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";
const urlToGetImages = "http://image.tmdb.org/t/p/w500";

export default function FavoriteMenu({
  anchorEl,
  open,
  handleClose,
  favoriteItem,
  device,
}) {
  const { movieDetailList, setMovieDetailList } = useFavorite();

  React.useEffect(() => {
    const getDataDetail = async (itemID) => {
      try {
        const response = await apiService.get(
          `https://api.themoviedb.org/3/${device}/${itemID}?api_key=${apiKey}`
        );
        // console.log(response.data);
        setMovieDetailList([...movieDetailList, response.data]);
      } catch (error) {
        console.log(error);
      }
    };

    favoriteItem.map((item) => getDataDetail(item));
  }, [favoriteItem]);

  if (movieDetailList.length !== 0) {
    return (
      <div>
        <Menu
          sx={{ width: "400px" }}
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {movieDetailList.map((item, index) => (
            <MenuItem key={index}>
              <Stack direction="row" spacing={1}>
                <Box
                  sx={{
                    backgroundImage: `url(${urlToGetImages}${item["backdrop_path"]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    width: "50px",
                  }}
                ></Box>
                <Typography variant="p" alignSelf="center">
                  {device === "movie" ? item["title"] : item["name"]}
                </Typography>
                <IconButton
                  id={index}
                  aria-label="delete"
                  onClick={(event) => {
                    setMovieDetailList(
                      movieDetailList.filter(
                        (i, idx) => idx !== parseInt(event.currentTarget.id)
                      )
                    );
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}
