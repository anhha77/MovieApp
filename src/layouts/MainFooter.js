import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const styleTypo = {
  color: "#fff",
  margin: "0px 10px",
  cursor: "pointer",
  "&:hover": {
    color: "secondary.light",
  },
};

const styleBtn = {
  backgroundColor: "secondary.main",
  "&:hover": {
    backgroundColor: "secondary.dark",
  },
};

const styleBox = {
  border: "1px solid rgba(255, 255, 255, 0.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginRight: "15px",
  marginTop: "5px",
};

function MainFooter() {
  return (
    <Stack
      sx={{ bgcolor: "rgb(18, 34, 45)", padding: "45px 40px" }}
      spacing={3}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 4, md: 20 }}
      >
        <Stack
          spacing={3}
          maxWidth={{ xs: "100%", md: "220px" }}
          textAlign={{ xs: "center", md: "left" }}
        >
          <Box>
            <img
              src="https://streamo.vuejstemplate.com/images/logo/logo.png"
              alt="Logo"
            />
          </Box>
          <Typography variant="p" sx={{ color: "#fff" }}>
            Eiusmod tempor incididunt ut la abore et minim ven exerc itation
            ulla mco lboris naliquip ex ea comm.
          </Typography>
          <Stack
            direction="row"
            sx={{
              listStyle: "none",
              paddingLeft: "0px",
              color: "#fff",
            }}
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <li className="social-icon" style={{ margin: "0px 0px 5px" }}>
              <FacebookIcon />
            </li>
            <li className="social-icon" style={{ margin: "0px 5px" }}>
              <TwitterIcon />
            </li>
            <li className="social-icon" style={{ margin: "0px 5px" }}>
              <LinkedInIcon />
            </li>
            <li className="social-icon" style={{ margin: "0px 5px" }}>
              <CameraAltIcon />
            </li>
          </Stack>
        </Stack>
        <Stack flexGrow="1" spacing={3}>
          <Stack direction="row" flexWrap="wrap" justifyContent="flex-start">
            <Typography variant="h6" sx={styleTypo}>
              Home
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              About Us
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Series
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Contact Us
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Tv Series
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Tech
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Movie
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Video
            </Typography>
            <Typography variant="h6" sx={styleTypo}>
              Live
            </Typography>
          </Stack>
          <Grid container>
            <Grid item xs={12} md={3} sx={styleBox}>
              <img
                src="https://streamo.vuejstemplate.com/images/brand/1.png"
                alt="Logo"
                style={{ objectFit: "cover", transition: "transform .5s" }}
                className="img-movie-app"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={styleBox}>
              <img
                src="https://streamo.vuejstemplate.com/images/brand/2.png"
                alt="Logo"
                style={{ objectFit: "cover", transition: "transform .5s" }}
                className="img-movie-app"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={styleBox}>
              <img
                src="https://streamo.vuejstemplate.com/images/brand/3.png"
                alt="Logo"
                style={{ objectFit: "cover", transition: "transform .5s" }}
                className="img-movie-app"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={styleBox}>
              <img
                src="https://streamo.vuejstemplate.com/images/brand/4.png"
                alt="Logo"
                style={{ objectFit: "cover", transition: "transform .5s" }}
                className="img-movie-app"
              />
            </Grid>
            <Grid item xs={12} md={3} sx={styleBox}>
              <img
                src="https://streamo.vuejstemplate.com/images/brand/5.png"
                alt="Logo"
                style={{ objectFit: "cover", transition: "transform .5s" }}
                className="img-movie-app"
              />
            </Grid>
          </Grid>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent={{ xs: "center", md: "flex-start" }}
          >
            <Typography variant="p" sx={styleTypo}>
              Report a bug
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Request a feature
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              {" "}
              Content Grievance
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Movie Request
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Submit Your Story
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Privacy Policy
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Term of Services
            </Typography>
            <Typography variant="p" sx={styleTypo}>
              Support
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems="center"
        sx={{ color: "#fff" }}
        spacing={3}
      >
        <Typography variant="p">Copyright ©2024 All rights reserved</Typography>
        <Box width={{ xs: "100%", md: "auto" }}>
          <Button variant="contained" sx={styleBtn} fullWidth={true}>
            Become a member
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

export default MainFooter;
