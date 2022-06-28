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

function MatchComponent(props) {
    const theme = useTheme();

  return (
    <center>
      <Card sx={{width:600, display: 'inline-block', margin: '16px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <CardMedia
            component="img"
            sx={{ width: 151, borderRadius:"50%", margin: '32px' }}
            image=  "../../assets/adityap.jpg"
            alt="Live from space album cover"
        />
        <center>
        <CardContent sx={{ flex: '1 0 auto', margin: '20px' }}>
          <Typography component="div" variant="h5">
            {props.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.email}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {props.username}
          </Typography>
        </CardContent>
        
        <Box sx={{ display: 'inline-block', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box>
        </center>
        
      </Box>
     
    </Card>
    </center>
  )
}

export default MatchComponent