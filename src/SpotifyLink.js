import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { CssBaseline } from '@material-ui/core';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Stack from '@mui/material/Stack';


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

export default function SpotifyLink() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <ResponsiveAppBar />
            <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <Box sx={{padding: '64px', borderRadius: '4px', border: 1, borderColor: 'grey', backgroundColor:'white'}}>
                    <center>
                        <Stack>

                    <h2 className='text-center mb-4'><b>Spotify Info</b></h2>

                    <TextField 
                        sx={{margin: '8px'}}
                        inputProps={{ className: classes.input }}
                        id="filled-basic" 
                        label="Username" 
                        variant="outlined"
                        helperText="Your Spotify Username"
                    />
                    <TextField 
                       sx={{margin: '8px'}}
                       inputProps={{ className: classes.input }}
                       id="filled-basic" 
                       label="https://" 
                       variant="outlined"
                       helperText="Your Spotify Playlist Link"
                   />
                   </Stack>

                    <Box sx={{padding: '16px'}}>
                        <center>
                            <Button variant="contained" sx={{ bgcolor: "black" }}>Submit</Button>
                        </center>
                    </Box>
                    </center>
                </Box>
            </Container>

        </div>
    );
}