import React, { Component } from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import MatchComponent from "./MatchComponent";
import Box from "@mui/material/Box";
import { useAuth } from "../../contexts/authContexts";
import CircularProgress from "@mui/material/CircularProgress";
import RecommendedSongsPopover from "./RecommendedSongsPopover";
import { TopMatches } from "./TopMatches";

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
  const { currentUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [songCount, setSongCount] = useState({});
  const [artistCount, setArtistCount] = useState({});
  const [movieCount, setMovieCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [recommendedSongs, setRecommendedSongs] = useState([]);
  const [popoverOpen, setPopoveropen] = useState(true)

  const server_base_url = process.env.REACT_APP_SERVER_URL;
  const spotify_url = process.env.REACT_APP_SPOTIFY_BASE_URL;

  const token = window.localStorage.getItem("token");
  const topArtists = window.localStorage.getItem("topArtists");
  const topTracks = window.localStorage.getItem("topTracks");

  const handlePopoverButton = () => {
    setPopoveropen(true)
  }

  const handlePopoverClick = () => {
    setPopoveropen(false)
  }

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
    setRecommendedSongs(data.tracks);
    setLoading(false);
    getUserData();
  };

  const getUserData = async (e) => {
    setLoading(true);
    const { data2 } = await axios
      .get(server_base_url + "/matchingusers", {
        params: {
          uid: currentUser.uid,
        },
      })
      .then((response) => {
        setSongCount(response.data);
        axios
          .get(server_base_url + "/matchingusers2", {
            params: {
              uid: currentUser.uid,
            },
          })
          .then((response2) => {
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

  useEffect(() => {
    getRecommendedSongs();
  }, []);

  useEffect(() => {
    if (users.length === 0) {
      var items = Object.keys(songCount).map(function (key) {
        return [key, songCount[key]];
      });
      items.sort((a, b) => b[1] - a[1]);
      for (const [key, value] of items) {
        const data3 = axios
          .get(server_base_url + "/userinfo", {
            params: {
              uid: key,
            },
          })
          .then((response) => {
            setUsers((users) => [...users, response.data]);
          });
      }
    }
  }, [movieCount]);

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
        popoverOpen && (<RecommendedSongsPopover recommendedSongs={recommendedSongs} popoverClick={handlePopoverClick}/>)
        
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
              onClick={handlePopoverButton}
            >
              Show AI Recommended Songs
            </Button>
            <TopMatches users={users} songCount={songCount} artistCount={artistCount} movieCount={movieCount}/>
            
          </div>
        </center>
      )}
    </div>
  );
}

export default MatchPage;
