import React, { Component } from 'react'
import ResponsiveAppBar from './ResponsiveAppBar'
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import MatchComponent from './MatchComponent';
import { get } from 'react-scroll/modules/mixins/scroller';
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
  const server_base_url = process.env.REACT_APP_SERVER_URL

 

  const getUserData = async (e) => {
    e.preventDefault()
    const { data } = await axios.get(server_base_url + "/users", {
    
    })
    setUsers(data)
    console.log(data)

  }

  const renderUsers = () => {
    return <>
      {users.map((user) => (
        <MatchComponent name={user.name} />
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
