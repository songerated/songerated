import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useNavigate } from "react-router-dom";
import StepperComponent from "./StepperComponent";
import { useAuth } from "../contexts/authContexts";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import { Stack } from "react-bootstrap";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  multilineColor: {
    color: "green",
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function UserInfo() {
  const [token, setToken] = useState("");
  const spotify_url = process.env.REACT_APP_SPOTIFY_BASE_URL;
  const { currentUser } = useAuth();
  const id = currentUser.uid;
  const navigate = useNavigate();
  const classes = useStyles();
  const server_base_url = process.env.REACT_APP_SERVER_URL;

  const CLIENT_ID = "f9e6e2d07abd4cedaf792ba099e88c69";
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URL;
  const AUTH_ENDPOINT = process.env.REACT_APP_SPOTIFY_AUTH_APP;
  const RESPONSE_TYPE = "token";
  const SPACE_DELIMITER = "%20";
  const SCOPES = ["user-top-read"];
  const SCOMES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  //This is the function that gets the token from the URL
  useEffect(() => {
    const hash = window.location.hash;
    let tokent = hash
      ?.substring(1)
      ?.split("&")
      ?.find((elem) => elem.startsWith("access_token"))
      ?.split("=")[1];
    if (tokent == null) {
      tokent = window.localStorage.getItem("token");
    }
    window.localStorage.setItem("token", tokent);

    setToken(tokent);
    console.log(tokent);
  }, []);

  useEffect(() => {
    if (token === "") return;
    loadTracks();
    console.log(token);
    loadArtists();
  }, [token]);

  const loadTracks = async (e) => {
    console.log(token);
    axios
      .get(spotify_url + "/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {},
      })
      .then((response) => {
        setTopTracks(response.data.items);
        setIsTopTracks(true);
        console.log(response.data.items);
      })
      .catch((error) => {
        window.location.replace(
          `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOMES_URL_PARAM}&response_type=${RESPONSE_TYPE}`
        );
        console.log(error.response.status);
      });
  };

  const loadArtists = async (e) => {
    console.log(token);
    axios
      .get(spotify_url + "/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {},
      })
      .then((response) => {
        setTopArtists(response.data.items);
        setIsTopArtists(true);
        console.log(response.data.items);
      });
  };

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [isTopArtists, setIsTopArtists] = useState(false);
  const [loading, setLoading] = useState(false)

  const renderTopTracks = () => {
    return (
      <>
        <Typography
          variant="h6"
          style={{
            background: "rgba(230,    224, 227, 0.61)",
            borderRadius: "100",
            padding: "8px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          Your most listened songs
        </Typography>

        <TableContainer>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Track Name</StyledTableCell>
                <StyledTableCell align="right">Artists</StyledTableCell>
                <StyledTableCell align="right">Album</StyledTableCell>
                <StyledTableCell align="right">Popularity</StyledTableCell>
                <StyledTableCell align="right">Explicit</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topTracks?.map((track) => (
                <StyledTableRow
                  key={track.id}
                  style={{
                    backgroundColor: "rgba(230,    224, 227, 0.51)",
                  }}
                >
                  <StyledTableCell component="th" scope="row">
                    {
                      <Link
                        href={track.external_urls.spotify}
                        underline="hover"
                        style={{ color: "#000" }}
                      >
                        {track.name}
                      </Link>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Link
                        href={track.artists[0].external_urls.spotify}
                        underline="hover"
                        style={{ color: "#000" }}
                      >
                        {" "}
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </Link>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {
                      <Link
                        href={track.album.external_urls.spotify}
                        underline="hover"
                        style={{ color: "#000" }}
                      >
                        {track.album.name}
                      </Link>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {track.popularity}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {track.explicit.toString()}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  const renderTopArtists = () => {
    return (
      <>
        {" "}
        <Typography
          variant="h6"
          style={{
            background: "rgba(230,    224, 227, 0.61)",
            borderRadius: "100",
            padding: "8px",
            marginTop: "8px",
            marginBottom: "8px",
          }}
        >
          Your favourite artists
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Artist Name</StyledTableCell>
                <StyledTableCell align="right">Genres</StyledTableCell>
                <StyledTableCell align="right">Followers</StyledTableCell>
                <StyledTableCell align="right">Popularity</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topArtists?.map((artist) => (
                <StyledTableRow
                  key={artist.id}
                  style={{ backgroundColor: "rgba(230,    224, 227, 0.51)" }}
                >
                  <StyledTableCell component="th" scope="row">
                    {
                      <Link
                        href={artist.external_urls.spotify}
                        underline="hover"
                        style={{ color: "#000" }}
                      >
                        {artist.name}
                      </Link>
                    }
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {artist.genres.join(", ")}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {artist.followers.total}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {artist.popularity}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  };

  function handleOnSubmit() {
    setLoading(true);
    window.localStorage.setItem("topArtists", [
      topArtists[0].id,
      topArtists[1].id,
      topArtists[2].id,
    ]);
    window.localStorage.setItem("topTracks", [
      topTracks[0].id,
      topTracks[1].id,
    ]);

    axios
      .get(server_base_url + "/verifyuser", {
        params: {
          id: id,
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          axios
            .post(server_base_url + "/tracks", {
              topTracks: topTracks,
              uid: id,
            })
             .then((response) => navigate("/addmovies"));
        } else {
          navigate("/addmovies");
        }
      });
  }

  return (
    <div className={classes.root}>
      {!isTopTracks || !isTopArtists || loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Stack style={{ justifyContent: "center" }}>
          <div style={{ paddingTop: "64px" }}>
            <StepperComponent activeStep={1}></StepperComponent>
          </div>
          <center>
            <div style={{ margin: "32px", width: "80%" }}>
              {renderTopTracks()}
            </div>
            <div style={{ margin: "32px", width: "80%" }}>
              {renderTopArtists()}
            </div>
            <div style={{ width: "80%" }}>
              <Button
                type={"submit"}
                variant="contained"
                sx={{ bgcolor: "black", margin: "16px" }}
                onClick={handleOnSubmit}
              >
                Submit Data
              </Button>
              {loading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress color="inherit" />
              </Box>)
}
            </div>
          </center>
        </Stack>
      )}
    </div>
  );
}
