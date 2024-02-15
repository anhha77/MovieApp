import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircle from "@mui/icons-material/AccountCircle";

import MoreIcon from "@mui/icons-material/MoreVert";
import Logo from "./Logo";
import BasicMenu from "./BasicMenu";
import apiService from "../app/apiService";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import FavoriteMenu from "./FavoriteMenu";
import useFavorite from "../hooks/useFavorite";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

export default function AppBarHeader() {
  const auth = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [hamburgerMenuAnchorEl, setHamburgerMenuAnchorEl] =
    React.useState(null);
  const [favoriteAnchorEl, setFavoriteAnchorEl] = React.useState(null);

  const navigate = useNavigate();

  const [movieGenres, setMovieGenres] = React.useState([]);
  const [TVGenres, setTVGenres] = React.useState([]);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isHamburgerMenuOpen = Boolean(hamburgerMenuAnchorEl);
  const isFavoriteMenuOpen = Boolean(favoriteAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleHamburgerMenuOpen = (event) => {
    setHamburgerMenuAnchorEl(event.currentTarget);
  };

  const handleHamburgerMenuClose = () => {
    setHamburgerMenuAnchorEl(null);
  };

  const hanldeFavoriteMenuOpen = (event) => {
    setFavoriteAnchorEl(event.currentTarget);
  };

  const handleFavoriteMenuClose = () => {
    setFavoriteAnchorEl(null);
  };

  const { itemFavorite, setItemFavorite, device, movieDetailList } =
    useFavorite();

  React.useEffect(() => {
    const getMovieGenres = async () => {
      try {
        const response = await apiService.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`
        );
        console.log(response.data);
        setMovieGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };
    const getTVGenres = async () => {
      try {
        const response = await apiService.get(
          `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`
        );
        console.log(response.data);
        setTVGenres(response.data.genres);
      } catch (error) {
        console.log(error);
      }
    };

    getMovieGenres();
    getTVGenres();
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ width: "200px" }}
    >
      <MenuItem>{auth.user.username}</MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          auth.logout(() => navigate("/login", { replace: true }));
        }}
      >
        Log out
        <LogoutIcon sx={{ marginLeft: "15px" }} />
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      sx={{ width: "250px" }}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{auth.user.username}</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleMobileMenuClose();
          auth.logout(() => navigate("/login", { replace: true }));
        }}
      >
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Log out</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        maxHeight: "64px",
        zIndex: 10,
        position: "sticky",
        top: 0,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleHamburgerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <BasicMenu
            anchorEl={hamburgerMenuAnchorEl}
            handleClose={handleHamburgerMenuClose}
            open={isHamburgerMenuOpen}
            TVGenres={TVGenres}
            movieGenres={movieGenres}
          />

          <Logo sx={{ marginTop: "12px", marginRight: "15px" }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Movie App
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={hanldeFavoriteMenuOpen}
            >
              <Badge badgeContent={movieDetailList.length} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <FavoriteMenu
              anchorEl={favoriteAnchorEl}
              open={isFavoriteMenuOpen}
              handleClose={handleFavoriteMenuClose}
              favoriteItem={itemFavorite}
              device={device}
            />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
