import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import {useEffect, useState} from 'react';
import axios from 'axios';


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

    const searchArtists = async (e) => {
      e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
              Authorization: `Bearer ${token}`
          },
          params: {
              q: searchKey,
              type: "artist"
          }
      })

      setArtists(data.artists.items)
    }

    const getTopArtists = async (e) => {
      e.preventDefault()
        const {data} = await axios.get("https://api.spotify.com/v1/me/top/artists", {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          params: {
        }

          
      })

      //setTopArtists(data.items)
      renderTopArtists(data)

    }

    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [topArtists, setTopArtists] = useState([])

    const renderArtists = () => {
      return artists.map(artist => (
          <div key={artist.id}>
              {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
              {artist.name}
          </div>
      ))
    }

    const renderTopArtists = (data) => {
        console.log(data)
    }


    return (
      <div className={classes.root}>
          <ResponsiveAppBar/>
          <form onSubmit={searchArtists}>
            <input type="text" onChange={e => setSearchKey(e.target.value)}/>
            <button type={"submit"} onClick={renderArtists}>Search</button>
            {renderArtists()}

          </form>
          <button onClick={getTopArtists}>Get Artist</button>
      </div>
    )
}

