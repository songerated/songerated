import React, { Component } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useAuth } from "../contexts/authContexts"



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


export default function SubmitData() {
  const [topTracks, setTopTracks] = useState(null)
  const [dbResponse, setDbResponse] = useState(null)
  const {currentUser} = useAuth() 
  const id = currentUser.uid


  const classes = useStyles()
  const server_base_url = process.env.REACT_APP_SERVER_URL
  const spotify_url = process.env.REACT_APP_SPOTIFY_BASE_URL
  
  let token = window.localStorage.getItem("token")
  
  useEffect(() => {
    console.log(id)
    axios.post(server_base_url + "/tracks" , { topTracks: topTracks, uid: id })
        .then(response => setDbResponse(response));

    console.log(topTracks)
  }, [topTracks]);

 


  const getUserData = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(spotify_url + "/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      }


    })
    setTopTracks(data)
    console.log(data.items)

  }



  
  return (
    <div className={classes.root}>
      <ResponsiveAppBar/>
      <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={getUserData}>Get your most listened songs</Button>

    </div>
  )
  
}
