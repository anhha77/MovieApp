import React, { useContext } from "react";

import { handleFavoriteContext } from "../contexts/FavoriteContext";

function useFavorite() {
  return useContext(handleFavoriteContext);
}

export default useFavorite;
