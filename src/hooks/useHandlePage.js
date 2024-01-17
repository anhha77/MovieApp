import React, { useContext } from "react";
import { handlePageContext } from "../contexts/HanldePage";

function useHandlePage() {
  return useContext(handlePageContext);
}

export default useHandlePage;
