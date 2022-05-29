import React, { useRef } from 'react'
import {Form, Card} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveAppBar from '../ResponsiveAppBar';
import Axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

export default function DatabaseHome () {
    

    
  const serverURL = "https://verse-server.herokuapp.com/"  
  const classes = useStyles();
  const getUserData = () => {
    Axios.get(serverURL)
    .then(res => {
      console.log(res.data)
    })
  }
      
  return (
    <div className={classes.root}>
        <ResponsiveAppBar />
        {getUserData()}
        
   </ div>
   
  )
}
