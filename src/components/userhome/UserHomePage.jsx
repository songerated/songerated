import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useAuth } from "../../contexts/authContexts";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import CustomDrawer from "./CustomDrawer";
import UHMovieList from "./UHMovieList";


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

const UserHomePage = () => {
  const classes = useStyles();
  const { currentUser } = useAuth();

  const id = currentUser.uid;

  

  return (
    <div className={classes.root}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <ResponsiveAppBar />
        <CustomDrawer/>
        <UHMovieList uid={id}/>
      </Box>
    </div>
  );
};

export default UserHomePage;
