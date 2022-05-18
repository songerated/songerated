import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { CssBaseline } from '@material-ui/core';
import ResponsiveAppBar from './components/ResponsiveAppBar';

export default function SpotifyLink() {

    return (
        <div >
            <CssBaseline />
            <ResponsiveAppBar />
            <Container maxWidth="xs" >
                <Box sx={{margin:'16px', padding: '16px', borderRadius: '8px', border: 1, borderColor: 'grey.500'}}>
                    <center>
                    <TextField 
                        id="outlined-basic" 
                        label="Username" 
                        variant="outlined"
                        helperText="Your Spotify Username"
                    />

                    <Box sx={{padding: '16px'}}>
                        <center>
                            <Button variant="contained">Submit</Button>
                        </center>
                    </Box>
                    </center>
                </Box>
            </Container>

        </div>
    );
}