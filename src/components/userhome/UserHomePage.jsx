import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/authContexts";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawer from "./CustomDrawer";
import UHMovieList from "./UHMovieList";
import UHSongList from "./UHSongList";
import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import UHMovieListFull from "./UHMovieListFull";
import UHSongListFull from "./UHSongListFull";
import Stack from "@mui/material/Stack";
import UHSocialMedia from "./UHSocialMedia";
import UHMatches from "./UHMatches";
import UHYoutubeList from "./UHYoutubeList";
const server_base_url = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  multilineColor: {
    color: "green",
  },
}));

const UserHomePage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  var [userMovieList, setUserMovieList] = useState([]);
  var [userSongList, setUserSongList] = useState([]);
  var [userChannelList, setUserChannelList] = useState([]);

  var [activeDrawerItem, setActiveDrawerItem] = useState(0);

  const id = currentUser.uid;

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
  const handleBackdropOpen = () => {
    setBackdropOpen(true);
  };

  const DrawerItemClicked = (index) => {
    setActiveDrawerItem(index);
    console.log(activeDrawerItem);
  };

  useEffect(() => {
    setBackdropOpen(true);
    axios
      .get(server_base_url + "/usermovies", {
        params: {
          uid: `${id}`,
        },
      })
      .then((res) => {
        setUserMovieList(res.data);
        console.log(res);
      });

    axios
      .get(server_base_url + "/usersongs", {
        params: {
          uid: `${id}`,
        },
      })
      .then((res) => {
        setUserSongList(res.data);
        setBackdropOpen(false);
        console.log(res);
      });

    axios
      .get(server_base_url + "/userchannelslist", {
        params: {
          uid: `${id}`,
        },
      })
      .then((res) => {
        setUserChannelList(res.data);
        setBackdropOpen(false);
        console.log(res);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ResponsiveAppBar />
        <CustomDrawer change={DrawerItemClicked} />

        {backdropOpen ? (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        ) : (
          <>
            {
              (activeDrawerItem === 1 && (
                <UHSongListFull uid={id} tabledata={userSongList} />
              )) ||
              (activeDrawerItem === 0 && (
                <UHMovieListFull uid={id} tabledata={userMovieList} />
              )) ||
              (activeDrawerItem === 2 && <UHYoutubeList uid={id} tabledata={userChannelList} />)}
          </>
        )}
      </Box>
    </div>
  );
};

export default UserHomePage;
