import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

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

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
export default function UserInfo()  {
    const classes = useStyles();
    const [token, setToken] = useState("")
    

    //This is the function that gets the token from the URL
    useEffect(() => {
      const hash = window.location.hash
      let token = window.localStorage.getItem("token")
  
          token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
  
          window.location.hash = ""
          window.localStorage.setItem("token", token)
      
  
      setToken(token)
  
    }, [])


    const getTopArtists = async (e) => {
      e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: {
        }

          
      })

      setTopArtists(data.items)

    }

    const [topArtists, setTopArtists] = useState([])


    const renderTopArtists = () => {
        return topArtists.map(artist => (
          <div key={artist.id}>
            <Card style={{ width: '18rem', margin: '16px' }}>
              <Card.Img variant="top" src={artist.images[0].url} />
              <Card.Body>
              <Card.Title>{artist.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Followers: {artist.followers.total}</Card.Subtitle>
              <Card.Text>
                <b>Genres:</b> {artist.genres.join(", ")}
              </Card.Text>
             
            </Card.Body>
            </Card>
            
            </div>
        ))
    }


    return (
      <div className={classes.root}>
          <ResponsiveAppBar/>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={9}>
              <Grid item xs>
                <Item>
                <form onSubmit={getTopArtists}>
                  <Button type={"submit"} onClick={renderTopArtists}>Get your spotify data</Button>
                  {renderTopArtists()}
                </form>
                </Item>
              </Grid>
              <Grid item xs>
                <Item>
                <form onSubmit={getTopArtists}>
                  <Button type={"submit"} onClick={renderTopArtists}>Get your spotify data</Button>
                  {renderTopArtists()}
                </form>
                </Item>
              </Grid>
              <Grid item xs>
                <Item>xs=4</Item>
              </Grid>
              
            </Grid>
        </Box>
          <center>
            
          </center>
      </div>
    )
}

