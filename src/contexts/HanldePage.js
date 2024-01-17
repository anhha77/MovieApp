import React, { createContext, useState } from "react";

const handlePageContext = createContext();

function HanldePage({ children }) {
  const [pageMovie, setPageMovie] = useState(1);
  const [pageTV, setPageTV] = useState(1);

  const [moviesFilter, setMoviesFilter] = useState([]);
  const [TVFilter, setTVFilter] = useState([]);
  const [filterClick, setFilterClick] = useState(false);

  return (
    <handlePageContext.Provider
      value={{
        pageMovie,
        setPageMovie,
        pageTV,
        setPageTV,
        moviesFilter,
        setMoviesFilter,
        TVFilter,
        setTVFilter,
        filterClick,
        setFilterClick,
      }}
    >
      {children}
    </handlePageContext.Provider>
  );
}

export { HanldePage, handlePageContext };
