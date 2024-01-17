import * as React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainLayout from "../layouts/MainLayout";
import DetailMoviePage from "../pages/DetailMoviePage";
import BlankLayout from "../layouts/BlankLayout";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";
import LoginPage from "../pages/LoginPage";
import useAuth from "../hooks/useAuth";
import MovieDetailModal from "../pages/MovieDetailModal";
import TVDetailModal from "../pages/TVDetailModal";
import DetailTVPage from "../pages/DetailTVPage";
import FilterPage from "../pages/FilterPage";

function Router() {
  const location = useLocation();
  let background = location.state && location.state.background;
  const auth = useAuth();
  console.log(auth.user);
  console.log(background);

  return (
    <>
      <Routes location={background || location}>
        <Route
          path="/"
          element={
            <AuthRequire>
              <MainLayout />
            </AuthRequire>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="movies/:id" element={<DetailMoviePage />} />
          <Route path="TV/:id" element={<DetailTVPage />} />
          <Route path="filterPage" element={<FilterPage />} />
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>

      {background ? (
        <Routes>
          <Route
            path="/movies/movieDetailModal/:id"
            element={<MovieDetailModal />}
          />
          <Route path="/TV/TVDetailModal/:id" element={<TVDetailModal />} />
        </Routes>
      ) : (
        ""
      )}
    </>
  );
}

export default Router;
