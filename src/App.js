import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeProvider";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import { HanldePage } from "./contexts/HanldePage";
import { FavoriteContext } from "./contexts/FavoriteContext";

function App() {
  return (
    <AuthProvider>
      <HanldePage>
        <FavoriteContext>
          <BrowserRouter>
            <ThemeProvider>
              <Router />
            </ThemeProvider>
          </BrowserRouter>
        </FavoriteContext>
      </HanldePage>
    </AuthProvider>
  );
}

export default App;
