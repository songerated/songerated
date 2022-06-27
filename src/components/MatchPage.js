import React, { Component } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import MatchComponent from './MatchComponent';
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

function MatchPage() {

    const classes = useStyles()

  return (
    <div className={classes.root}>
      <ResponsiveAppBar/>
      <center>     
         <MatchComponent/>
         <MatchComponent/>
         <MatchComponent/>

      </center>

    </div>
  )
}

export default MatchPage
