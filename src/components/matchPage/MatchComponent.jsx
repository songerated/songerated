import * as React from 'react';
import { useTheme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import {Link, useNavigate} from 'react-router-dom';


function MatchComponent(props) {
    const theme = useTheme();
    const navigate = useNavigate();


    function handleOnclick() {
      window.localStorage.setItem("chatid", props.userid)
      navigate('/chat');
        console.log(props.userid)
    }

    let num = Math.floor(Math.random() * 100);
    num = num % 2;

  return (
    <center>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
            component="img"
            sx={{ width: 151, borderRadius:"50%", margin: '32px' }}
            image=  {"../../assets/" + num + ".png"}
            alt="Live from space album cover"
        />
        {/* <center>
        <CardContent sx={{ flex: '1 0 auto', margin: '20px' }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.email}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Matching Song Count: {props.song}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Matching Movie Count: {props.movie}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Matching Artist Count: {props.artist}
          </Typography>
        </CardContent>
        
        <Box sx={{ display: 'inline-block', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon onClick={handleOnclick} sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
        </center> */}
        
      </Box>
     
    </center>
  )
}

export default MatchComponent