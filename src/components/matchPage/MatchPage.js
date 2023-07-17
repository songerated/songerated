import React, { Component } from "react";
import ResponsiveAppBar from ".././ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import MatchComponent from ".././MatchComponent";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/authContexts";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";
import CircularProgress from "@mui/material/CircularProgress";
import RecommendedSongsTable from "./RecommendedSongsTable";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  multilineColor: {
    color: "green",
  },
  popoverRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.MuiPopover-paper": {
      background: "transparent",
    },
  },
}));

function MatchPage() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(true);
  const [songCount, setSongCount] = useState({});
  const [artistCount, setArtistCount] = useState({});
  const [movieCount, setMovieCount] = useState({});
  const [loading, setLoading] = useState(true);
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
  const [popoverOpen, setPopoverOpen] = useState(true);

  console.log(topArtists);
  console.log(topTracks);

  const handleClose = () => {
    setAnchorEl(null);
    setPopoverOpen(false);
  };

  const handleOpen = () => {
    setPopoverOpen(true);
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
    setLoading(false);
    setIsRecommendationExecuted(true);
    getUserData();
  };

  useEffect(() => {
    getRecommendedSongs();
  }, []);

  useEffect(() => {
    console.log(songCount);
    console.log(artistCount);
    console.log(movieCount);
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
            console.log(users);
          });
      }
    }
  }, [movieCount]);

  const getUserData = async (e) => {
    setLoading(true);
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
            axios
              .get(server_base_url + "/matchingmovies", {
                params: {
                  uid: currentUser.uid,
                },
              })
              .then((response3) => {
                setMovieCount(response3.data);
                setLoading(false);
              });
          });
      });
  };

  return (
    <div className={classes.root}>
      <ResponsiveAppBar />

      {loading ? (
        <Box
          sx={{ display: "flex", height: "100vh" }}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Popover
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          onClick={handleClose}
          style={{ width: "100%" }}
          classes={{
            root: classes.popoverRoot,
          }}
          anchorReference="none"

        >
          {isRecommendationExecuted && (
            <center>
              <Box sx={{ margin: "32px" }}>
                <Typography variant="h6" gutterBottom>
                  Our AI Model generated some songs based on your top Artists
                  and top Songs <br />
                </Typography>
              </Box>
              <Box sx={{ margin: "32px", width: "80%" }}>
                <RecommendedSongsTable recommendedSongs={recommendedSongs} />
              </Box>
            </center>
          )}
        </Popover>
      )}

      {!loading && (
        <center>
          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "center",
              padding: "32px",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "58px",
            }}
          >
            <Button
              type={"submit"}
              variant="contained"
              sx={{ bgcolor: "black", margin: "16px" }}
              onClick={handleOpen}
            >
              Show AI Recommended Songs
            </Button>
            {users?.map((user) => (
              <MatchComponent
                userid={user[0].id}
                name={user[0].name}
                email={user[0].email}
                song={songCount[user[0].id]}
                artist={artistCount[user[0].id]}
                movie={movieCount[user[0].id]}
              />
            ))}
          </div>
        </center>
      )}
    </div>
  );
}

export default MatchPage;
