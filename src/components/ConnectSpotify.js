import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import Spotifyhtml from './Spotifyhtml.js';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    multilineColor: {
        color: "green"
      }
  }));
export default function ConnectSpotify()  {
    const classes = useStyles();

  return (
    <div class={classes.root}>
        <ResponsiveAppBar/>
        <Spotifyhtml/>
    </div>
  )
}

