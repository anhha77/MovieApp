import React from "react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeProvider";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import { HanldePage } from "./contexts/HanldePage";

function App() {
  return (
    <AuthProvider>
      <HanldePage>
        <BrowserRouter>
          <ThemeProvider>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </HanldePage>
    </AuthProvider>
  );
}

export default App;
