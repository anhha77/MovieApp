import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiService from "../app/apiService";
import { CircularProgress, Stack } from "@mui/material";
import { getImageSize } from "react-image-size";

const apiKey = "18f8661b3ab6033ea111c50a44f591bb";
const urlToGetImages = "http://image.tmdb.org/t/p/w500";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "rgba(0, 0, 0 , 0.25)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: 24,
  borderRadius: "10px",
};

const styledBtn = {
  bgcolor: "secondary.main",
  width: { xs: "80%", sm: "200px" },
  "&:hover": {
    bgcolor: "secondary.dark",
  },
};

export default function TVDetailModal() {
  const navigate = useNavigate();
  const params = useParams();
  const TVID = params.id;

  const [TVDetail, setTVDetail] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  // const [padding, setPadding] = React.useState(0);

  React.useEffect(() => {
    const getDataMovieDetail = async () => {
      try {
        setIsLoading(true);
        const response = await apiService.get(
          `https://api.themoviedb.org/3/tv/${TVID}?api_key=${apiKey}`
        );
        // const urlImage = `${urlToGetImages}${response["data"]["backdrop_path"]}`;
        // const demensions = await getImageSize(urlImage);
        // console.log(demensions);
        setIsLoading(false);
        console.log(response.data);
        setTVDetail(response.data);
        // const aspectRatio = demensions.height / demensions.width;
        // setPadding(aspectRatio * 100);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getDataMovieDetail();
  }, [TVID]);

  if (!TVDetail) {
    return (
      <div>
        <Modal
          open={true}
          onClose={() => navigate(-1)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Typography variant="p">No TV found</Typography>
            )}
          </Box>
        </Modal>
      </div>
    );
  }

  return (
    <div>
      <Modal
        open={true}
        onClose={() => navigate(-1)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Box
              flexGrow={1}
              sx={{
                backgroundImage: `url(${urlToGetImages}${TVDetail["backdrop_path"]})`,
                backgroundSize: "cover",
                display: "flex",
                height: { xs: "300px", sm: "400px", md: "500px", lg: "600px" },
              }}
            >
              <Box
                flexGrow={1}
                sx={{
                  width: "70%",
                  background:
                    "linear-gradient(90deg, rgba(0, 0, 0, 0.94) 60%, transparent)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "90%", sm: "50%" },
                    display: "flex",
                    flexDirection: "column",
                  }}
                  flexGrow={1}
                >
                  <Stack
                    spacing={2}
                    sx={{ color: "#fff", marginLeft: "30px" }}
                    flexGrow={1}
                    justifyContent="center"
                  >
                    <Typography variant="h3">{TVDetail["name"]}</Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography
                        variant="p"
                        sx={{ color: "success.main" }}
                        display={{ xs: "none", sm: "block" }}
                      >
                        Popularity: {TVDetail["popularity"]}
                      </Typography>
                      <Typography
                        variant="p"
                        color="#f39c12"
                        display={{ xs: "none", sm: "block" }}
                      >
                        Run Time: {TVDetail["vote_average"]}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="p"
                      display={{ xs: "none", sm: "block" }}
                    >
                      Release Date: {TVDetail["first_air_date"]}
                    </Typography>
                    <Typography
                      display={{ xs: "none", md: "block" }}
                      variant="p"
                      color="rgba(255, 255, 255, 0.25)"
                    >
                      {TVDetail["overview"]}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={styledBtn}
                      onClick={() => navigate(`/TV/${TVID}`, { replace: true })}
                    >
                      View Detail
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}
