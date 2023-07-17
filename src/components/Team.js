import Header from './Header'
import Teamcard from './Teamcard'
import ResponsiveAppBar from './ResponsiveAppBar'
import React, { useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@mui/material'
const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/temp3.png'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

const Team = () => {
    const classes = useStyles();

  return (
    <div className={classes.root} style={{marginTop:'48px'}}>
        <ResponsiveAppBar />
        <Typography
          sx={{ textAlign: "center" }}
          variant="h4"
          paddingBottom="24px"
          style={{paddingTop:'8vh'}}
        >
          Behind The Scenes
        </Typography>
        <Teamcard />
    </div>
  )
}

export default Team
