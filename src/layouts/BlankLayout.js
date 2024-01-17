import styled from "@emotion/styled";
import { Stack, Typography } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const HeaderStyle = styled("header")(({ theme }) => ({
  top: "5%",
  left: "50%",
  transform: "translateX(-50%)",
  position: "absolute",
}));

const backgroundStyled = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(https://i2.wp.com/thebutlercollegian.com/wp-content/uploads/2019/03/netflix-image.jpg?w=2000&ssl=1)`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center center",
  backgroundSize: "cover",
  backgroundColor: "#b3b3b3",
  backgroundBlendMode: "mutiply",
};

function BlankLayout() {
  return (
    <div style={backgroundStyled}>
      <Stack minHeight="100vh" justifyContent="center" alignItems="center">
        <Stack
          alignItems="center"
          justifyContent="space-around"
          sx={{
            height: "400px",
            borderRadius: "4px",
            background: "rgba(0, 0, 0, 0.75)",
            padding: "60px 68px 40px",
            position: "relative",
          }}
        >
          <HeaderStyle>
            <Logo sx={{ width: 70, height: 70 }} />
          </HeaderStyle>
          <Typography
            variant="h4"
            sx={{ color: "secondary.light", marginBottom: "20px" }}
          >
            Movie App
          </Typography>
          <Outlet />
        </Stack>
      </Stack>
    </div>
  );
}

export default BlankLayout;
