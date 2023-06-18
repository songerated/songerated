import Header from './Header'
import Teamcard from './Teamcard'
import ResponsiveAppBar from './ResponsiveAppBar'
import React, { useEffect, useRef, useState } from 'react'
import MatchComponent from './MatchComponent'
import { makeStyles } from '@material-ui/core/styles';
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
        <Teamcard />
    </div>
  )
}

export default Team
