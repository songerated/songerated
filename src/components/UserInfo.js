import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link, useNavigate } from "react-router-dom";
import StepperComponent from "./StepperComponent";
import { useAuth } from "../contexts/authContexts";
import { TokenOutlined } from "@mui/icons-material";
import Skeleton from '@mui/material/Skeleton';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/music_setup_blur.jpg"
    })`,
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
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

  //This is the function that gets the token from the URL
  useEffect(() => {
    const hash = window.location.hash;
    let tokent = window.localStorage.getItem("token");

    tokent = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"))
      .split("=")[1];

    window.location.hash = "";
    window.localStorage.setItem("token", tokent)
    setToken(tokent);
    console.log(tokent);
    
    

  },[]);

  useEffect(() => {
    if (token === "")
      return;
    loadTracks();
    console.log(token);
    loadArtists();


  }, [token])

  



 

  const loadTracks = async (e) => {
    console.log(token)
    axios
      .get(spotify_url + "/me/top/tracks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {},
      })
      .then((response) => {
        setTopTracks(response.data.items);
        setIsTopTracks(true)
        console.log(response.data.items);
      });
  }

  const loadArtists = async (e) => {
    console.log(token)
    axios
      .get(spotify_url + "/me/top/artists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {},
      })
      .then((response) => {
        setTopArtists(response.data.items);
        setIsTopArtists(true)
        console.log(response.data.items);
      });
  }

  const getTopArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(spotify_url + "/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {},
    });
    console.log(data);

    setTopArtists(data.items);
  };

  

  const [topArtists, setTopArtists] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [isTopTracks, setIsTopTracks] = useState(false);
  const [isTopArtists, setIsTopArtists] = useState(false);



  const renderTopArtists = () => {
    return (
      <TableContainer component={Paper}>
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
              <StyledTableRow key={artist.id}>
                <StyledTableCell component="th" scope="row">
                  {artist.name}
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
    );
  };

  function handleOnSubmit() {
    window.localStorage.setItem("topArtists", [topArtists[0].id, topArtists[1].id, topArtists[2].id])
    window.localStorage.setItem("topTracks", [topTracks[0].id, topTracks[1].id])

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
      <div style={{ paddingTop: "64px" }}>
        <StepperComponent activeStep={1}></StepperComponent>
      </div>
      <center>
        <Box sx={{ margin: "32px", width: "80%" }}>
          {
            !isTopTracks && <Grid container spacing={8}>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>
                          <Skeleton width="100%"/>

          </Grid>
          }
            {
              isTopTracks && <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
                    <StyledTableRow key={track.id}>
                      <StyledTableCell component="th" scope="row">
                        {track.name}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {track.artists.map((artist) => artist.name).join(", ")}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {track.album.name}
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
            }
          

          {/* </form> */}
        </Box>
        <Box sx={{ margin: "32px", width: "80%" }}>
          
          {isTopArtists && renderTopArtists()}
        </Box>

        <Box sx={{ margin: "32px", width: "80%" }}>
          <form onSubmit={getTopArtists}>
            <Button
              type={"submit"}
              variant="contained"
              sx={{ bgcolor: "black", margin: "16px" }}
              onClick={handleOnSubmit}
            >
              Submit Data
            </Button>
          </form>
        </Box>
      </center>
    </div>
  );
}
