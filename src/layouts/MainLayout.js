import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import MainHeader from "../layouts/MainHeader";
import MainFooter from "../layouts/MainFooter";

function MainLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <MainHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
      <MainFooter />
    </Stack>
  );
}

export default MainLayout;
