import React, { createContext, useState } from "react";

const handleFavoriteContext = createContext();

function FavoriteContext({ children }) {
  const [itemFavorite, setItemFavorite] = useState([]);
  const [device, setDevice] = useState(null);
  const [movieDetailList, setMovieDetailList] = useState([]);

  return (
    <handleFavoriteContext.Provider
      value={{
        itemFavorite,
        setItemFavorite,
        device,
        setDevice,
        movieDetailList,
        setMovieDetailList,
      }}
    >
      {children}
    </handleFavoriteContext.Provider>
  );
}

export { FavoriteContext, handleFavoriteContext };
