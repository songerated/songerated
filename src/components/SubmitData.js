import React, { Component } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';


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
  const [topArtists, setTopArtists] = useState([])
  const [topTracks, setTopTracks] = useState([])

  const classes = useStyles()
  
  let token = window.localStorage.getItem("token")


  const getUserData = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      }


    })
    setTopTracks(data.items)
    console.log(data)

  }



  
  return (
    <div className={classes.root}>
      <ResponsiveAppBar/>
      <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={getUserData}>Get your most listened songs</Button>

    </div>
  )
  
}
