import React from 'react'

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

const ChannelCard = (props) => {
    const theme = useTheme();

    return (
        <Card sx={{ display: 'flex', }} style={{margin:'16px', padding:'16px', justifyContent: 'space-between'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" variant="h5">
                {props.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary" component="div">
                Published At:  + {props.publishedAt}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {props.description}
              </Typography>
            </CardContent>
            
          </Box>
          <div style={{display:'flex', alignItems:'center'}}>
          <CardMedia
            component="img"
            style={{width: 100, height:100}}
            image={props.imgsrc}
            alt="Live from space album cover"
          />
          </div>
        </Card>
      );
}

export default ChannelCard
