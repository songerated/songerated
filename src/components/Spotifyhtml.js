import * as React from 'react';
import '../index.css';

export default function Spotifyhtml()  {
  const CLIENT_ID = "f9e6e2d07abd4cedaf792ba099e88c69"
  const REDIRECT_URI = "http://localhost:3000/"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"
  return (
    <div>
      <div id="login">
        <h1>First, log in to spotify</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      </div>
        <div id="loggedin">
      </div>
    </div>
  )
}

