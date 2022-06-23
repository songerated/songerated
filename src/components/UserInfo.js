import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {Link, useNavigate} from 'react-router-dom';


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



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function UserInfo() {
  const classes = useStyles();
  const [token, setToken] = useState("")
  const navigate = useNavigate();



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
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      }

    })
    console.log(data)


    setTopArtists(data.items)

  }

  const getTopTracks = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/me/top/tracks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      }


    })

    setTopTracks(data.items)

  }

  const [topArtists, setTopArtists] = useState([])
  const [topTracks, setTopTracks] = useState([])


  const renderTopArtists = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Artist Name</StyledTableCell>
              <StyledTableCell align="right">Genres</StyledTableCell>
              <StyledTableCell align="right">Followers</StyledTableCell>
              <StyledTableCell align="right">Popularity</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topArtists.map((artist) => (
              <StyledTableRow key={artist.id}>
                <StyledTableCell component="th" scope="row">
                  {artist.name}
                </StyledTableCell>
                <StyledTableCell align="right">{
                  artist.genres.join(", ")
                }</StyledTableCell>
                <StyledTableCell align="right">{artist.followers.total}</StyledTableCell>
                <StyledTableCell align="right">{artist.popularity}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  function handleOnSubmit(){
    navigate("/submitdata")
  }



  const renderTopTracks = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Track Name</StyledTableCell>
              <StyledTableCell align="right">Artists</StyledTableCell>
              <StyledTableCell align="right">Album</StyledTableCell>
              <StyledTableCell align="right">Popularity</StyledTableCell>
              <StyledTableCell align="right">Explicit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topTracks.map((track) => (
              <StyledTableRow key={track.id}>
                <StyledTableCell component="th" scope="row">
                  {track.name}
                </StyledTableCell>
                <StyledTableCell align="right">{
                  track.artists.map(artist => artist.name).join(", ")
                }</StyledTableCell>
                <StyledTableCell align="right">{track.album.name}</StyledTableCell>
                <StyledTableCell align="right">{track.popularity}</StyledTableCell>
                <StyledTableCell align="right">{track.explicit.toString()}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }


  return (
    <div className={classes.root}>
      <ResponsiveAppBar />

      <center>
        <Box sx={{ margin: '32px', width: "80%" }}>
          <form onSubmit={getTopTracks}>
            <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={renderTopTracks}>Get your most listened songs</Button>
            {renderTopTracks()}
          </form>
        </Box>
        <Box sx={{ margin: '32px', width: "80%" }}>

          <form onSubmit={getTopArtists}>
            <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={renderTopArtists}>Get your favourite artists</Button>
            {renderTopArtists()}
          </form>
        </Box>

        <Box sx={{ margin: '32px', width: "80%" }}>

          <form onSubmit={getTopArtists}>
            <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={handleOnSubmit}>Submit Data</Button>

          </form>
        </Box>

      </center>
    </div>
  )
}
