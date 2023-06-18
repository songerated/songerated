import React, { Component } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import MatchComponent from "./MatchComponent";
import { get } from "react-scroll/modules/mixins/scroller";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Image } from "react-bootstrap";
import CardMedia from "@mui/material/CardMedia";
import { useAuth } from "../contexts/authContexts";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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

function MatchPage() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(true);
  const [songCount, setSongCount] = useState({});
  const [artistCount, setArtistCount] = useState({});
  const server_base_url = process.env.REACT_APP_SERVER_URL;
  const { currentUser } = useAuth();
  const spotify_url = process.env.REACT_APP_SPOTIFY_BASE_URL;
  const [isRecommendationExecuted, setIsRecommendationExecuted] =
    useState(false);

  const token = window.localStorage.getItem("token");

  const topArtists = window.localStorage.getItem("topArtists");
  const topTracks = window.localStorage.getItem("topTracks");

  const topArtistsArray = topArtists.split(",");
  const topTracksArray = topTracks.split(",");

  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const open = Boolean(anchorEl);

  console.log(topArtists);
  console.log(topTracks);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getRecommendedSongs = async (e) => {
    const { data } = await axios.get(spotify_url + "/recommendations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_artists: `${topArtists}`,
        seed_tracks: `${topTracks}`,
      },
    });
    console.log(data.tracks);
    setRecommendedSongs(data.tracks);
    setIsRecommendationExecuted(true);
  };

  useEffect(() => {
    getRecommendedSongs();
  }, []);

  useEffect(() => {
    if (users.length === 0) {
      var items = Object.keys(songCount).map(function (key) {
        return [key, songCount[key]];
      });
      console.log("before");
      console.log(items);
      console.log("after");
      items.sort((a, b) => b[1] - a[1]);
      console.log(items);
      for (const [key, value] of items) {
        const data3 = axios
          .get(server_base_url + "/userinfo", {
            params: {
              uid: key,
            },
          })
          .then((response) => {
            console.log(response.data);
            setUsers((users) => [...users, response.data]);
          });
      }
    }
  }, [songCount]);

  const getUserData = async (e) => {
    e.preventDefault();

    const { data2 } = await axios
      .get(server_base_url + "/matchingusers", {
        params: {
          uid: currentUser.uid,
        },
      })
      .then((response) => {
        console.log("Song Data:");
        console.log(response.data);
        setSongCount(response.data);
        axios
          .get(server_base_url + "/matchingusers2", {
            params: {
              uid: currentUser.uid,
            },
          })
          .then((response2) => {
            console.log("Artist Data:");
            console.log(response2.data);
            setArtistCount(response2.data);
          });
      });
  };

  const renderUsers = () => {
    return (
      <>
        {users.map((user) => (
          <MatchComponent
            userid={user[0].id}
            name={user[0].name}
            email={user[0].email}
            song={songCount[user[0].id]}
            artist={artistCount[user[0].id]}
          />
        ))}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <ResponsiveAppBar />
      <Accordion sx={{ margin: "68px", }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography> Expand AI Recommended Songs</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
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
                {recommendedSongs?.map((track) => (
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
        </AccordionDetails>
      </Accordion>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ width: "1000px" }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        classes={{
          root: classes.popoverRoot,
        }}
      >
        {isRecommendationExecuted && (
        <center>
          <Box sx={{ margin: "32px", width: "80%" }}>
            <Typography variant="h6" gutterBottom>
              Our AI Model generated some songs based on your top Artists and
              top Songs <br />
            </Typography>
          </Box>
          <Box sx={{ margin: "32px", width: "80%" }}>
            <TableContainer component={Paper}>
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
                  {recommendedSongs?.map((track) => (
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
          </Box>
        </center>
        )}
      </Popover>

      <center>
        <form onSubmit={getUserData}>
          <Button
            type={"submit"}
            variant="contained"
            sx={{ bgcolor: "black", margin: "16px" }}
            onClick={renderUsers}
          >
            Get all the users
          </Button>
          {renderUsers()}
        </form>
      </center>
    </div>
  );
}

export default MatchPage;
