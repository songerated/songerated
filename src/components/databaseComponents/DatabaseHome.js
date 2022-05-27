import React, { useRef } from 'react'
import {Form, Card} from 'react-bootstrap'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';
import ResponsiveAppBar from '../ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

export default function DatabaseHome () {
    
    
    const classes = useStyles();
      
  return (
    <div className={classes.root}>
        <ResponsiveAppBar />
        
   </ div>
   
  )
}
