import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from './components/Header';
import PlaceToVisit from './components/PlaceToVisit';
import { useAuth } from "./contexts/authContexts"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup.jpg'})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
}));

export default function Home() {
    const classes = useStyles();
    const { currentUser } = useAuth()


    function renderHeader() {
      if(currentUser != null) {
        return <Header name="Sign Out" />
      }else{
        return <Header name="Sign In" />
      }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            {
              renderHeader()
            }
            <PlaceToVisit />
        </div>
    );
}