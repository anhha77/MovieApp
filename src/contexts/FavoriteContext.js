import React, { createContext, useState } from "react";

const handleFavoriteContext = createContext();

function FavoriteContext({ children }) {
  const [itemFavorite, setItemFavorite] = useState([]);
  const [device, setDevice] = useState([]);
  const [movieDetailList, setMovieDetailList] = useState([]);
  const [isInsert, setIsInsert] = useState(null);

  return (
    <handleFavoriteContext.Provider
      value={{
        itemFavorite,
        setItemFavorite,
        device,
        setDevice,
        movieDetailList,
        setMovieDetailList,
        isInsert,
        setIsInsert,
      }}
    >
      {children}
    </handleFavoriteContext.Provider>
  );
}

export { FavoriteContext, handleFavoriteContext };
