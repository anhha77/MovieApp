import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  FCheckbox,
  FMultiCheckbox,
  FTextField,
  FormProvider,
} from "../components/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MovieGenres from "../MovieGenres.json";
import tvGenres from "../TVGenres.json";
import useHandlePage from "../hooks/useHandlePage";

const styledBtn = {
  width: { xs: "100%", md: "250px" },
  backgroundColor: "secondary.main",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
};

export default function BasicMenu({
  anchorEl,
  handleClose,
  open,
  TVGenres,
  movieGenres,
}) {
  const nameMovieGenres = movieGenres.map((item) => item.name);
  const nameTVGenres = TVGenres.map((item) => item.name);
  const defaultValues = {
    movieGenresList: [],
    TVGenresList: [],
    searchQuery: "",
  };

  const methods = useForm({ defaultValues });

  const { watch, reset } = methods;

  const filters = watch();
  // console.log(filters);

  const {
    setMoviesFilter,
    setTVFilter,
    setPageMovie,
    setPageTV,
    filterClick,
    setFilterClick,
  } = useHandlePage();

  const saveFilterToLocalStorage = () => {
    if (filters.movieGenresList.length !== 0) {
      let mapGenresToID = MovieGenres["genres"].filter((item) =>
        filters.movieGenresList.includes(item.name)
      );
      mapGenresToID = mapGenresToID.map((item) => item.id);
      window.localStorage.setItem("movieGenresList", mapGenresToID.toString());
    } else {
      window.localStorage.removeItem("movieGenresList");
    }
    if (filters.TVGenresList.length !== 0) {
      let mapGenresToID = tvGenres["genres"].filter((item) =>
        filters.TVGenresList.includes(item.name)
      );
      mapGenresToID = mapGenresToID.map((item) => item.id);
      window.localStorage.setItem("TVGenresList", mapGenresToID.toString());
    } else {
      window.localStorage.removeItem("TVGenresList");
    }
    if (filters.searchQuery) {
      window.localStorage.setItem("searchQuery", filters.searchQuery);
    } else {
      window.localStorage.removeItem("searchQuery");
    }
  };

  saveFilterToLocalStorage();

  const resetFilters = () => {
    reset({
      movieGenresList: [],
      TVGenresList: [],
      searchQuery: "",
    });

    window.localStorage.removeItem("movieGenresList");
    window.localStorage.removeItem("TVGenresList");
    window.localStorage.removeItem("searchQuery");
  };

  const navigate = useNavigate();

  return (
    <div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{ maxWidth: "900px", maxHeight: "400px" }}
      >
        <Stack spacing={4} padding={{ xs: "0px 5px", md: "0px" }}>
          <Box padding="0px 10px">
            <Typography
              variant="h6"
              sx={{
                marginLeft: "15px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
              }}
            >
              Search
            </Typography>
            <FormProvider methods={methods}>
              <FTextField
                name="searchQuery"
                sx={{
                  width: {
                    xs: "80%",
                    md: "400px",
                  },
                  marginTop: "15px",
                  marginLeft: "15px",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormProvider>

            <Typography
              variant="h6"
              sx={{
                marginLeft: "15px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.25)",
              }}
            >
              Movie Genres
            </Typography>

            <FormProvider methods={methods}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                flexWrap="wrap"
                justifyContent="flex-start"
                sx={{ marginTop: "10px", marginLeft: "15px" }}
              >
                <FMultiCheckbox
                  name="movieGenresList"
                  options={nameMovieGenres}
                />
              </Stack>
            </FormProvider>
          </Box>

          <Box padding="0px 10px">
            <Typography
              variant="h6"
              sx={{
                marginLeft: "15px",
                borderBottom: "1px solid rgba(0 , 0, 0, 0.25)",
              }}
            >
              TV Genres
            </Typography>
            <FormProvider methods={methods}>
              <Stack
                direction={{ xs: "column", md: "row" }}
                flexWrap="wrap"
                justifyContent="flex-start"
                sx={{ marginTop: "10px", marginLeft: "15px" }}
              >
                <FMultiCheckbox name="TVGenresList" options={nameTVGenres} />
              </Stack>
            </FormProvider>
          </Box>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ md: "space-around" }}
            alignItems={{ xs: "center" }}
            spacing={3}
          >
            <Button
              variant="contained"
              sx={styledBtn}
              onClick={() => {
                if (
                  filters.movieGenresList.length !== 0 ||
                  filters.TVGenresList.length !== 0 ||
                  filters.searchQuery
                ) {
                  setMoviesFilter([]);
                  setTVFilter([]);
                  setPageMovie(1);
                  setPageTV(1);
                  setFilterClick(!filterClick);
                  return navigate("/filterPage");
                }
              }}
            >
              Filter
            </Button>
            <Button variant="contained" sx={styledBtn} onClick={resetFilters}>
              Clear All
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </div>
  );
}
