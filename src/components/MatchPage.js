import React, { Component } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import MatchComponent from './MatchComponent';
import { get } from 'react-scroll/modules/mixins/scroller';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Image } from 'react-bootstrap';
import CardMedia from '@mui/material/CardMedia';
import { useAuth } from "../contexts/authContexts"
import Typography from '@mui/material/Typography';
import {Link, useNavigate} from 'react-router-dom';
import {auth} from '../firebase'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'transparent',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

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

function MatchPage() {

  const classes = useStyles()
  const [users, setUsers] = useState([])
  const [songCount, setSongCount] = useState({})
  const server_base_url = process.env.REACT_APP_SERVER_URL
  const {currentUser} = useAuth() 
 
  console.log(currentUser.uid)

  useEffect(() => {
    if(users.length === 0){

      var items = Object.keys(songCount).map(function(key) {
        return [key, songCount[key]];
      });
      items.sort((a, b) => b[1] - a[1]);
      console.log(items)

      for (const [key, value] of items) {
        console.log(key, value);
        const data3 = axios.get(server_base_url + "/userinfo", {
          params: {
            uid: key
          }
        })
        .then(response => {
          console.log(response.data)
          setUsers(users => [...users, response.data])
        })
      
      }
    }

      
  }, [songCount])
 

  const getUserData = async (e) => {
    e.preventDefault()

    const { data2 } = await axios.get(server_base_url + "/matchingusers", {
      params: {
        uid: currentUser.uid
      }
    }).then(response => {
      setSongCount(response.data)
    
      console.log(response.data)
      console.log(songCount["114OmRvLspg13quCZopIfhyHfnE2"])
    })
    

  }

  


  const renderUsers = () => {

    return <>
      
            
            {users.map((user) => (
              <MatchComponent  userid={user[0].id} name={user[0].name} email={user[0].email} song={songCount[user[0].id]}  />
            ))}
         
      
    </>

  }


  return (
    <div className={classes.root}>
      <ResponsiveAppBar/>
      <center>     
      <form onSubmit={getUserData}>
            <Button type={"submit"} variant="contained" sx={{ bgcolor: "black", margin: '16px' }} onClick={renderUsers}>Get all the users</Button>
            {renderUsers()}
      </form>
      
         

      </center>

    </div>
  )
}

export default MatchPage