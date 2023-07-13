import React from 'react';

import {BrowserRouter as Router, Route, Switch, Routes} from 'react-router-dom';
import Home from './Home';
import SpotifyLink from './SpotifyLink';
import SignUp from './components/SignUp';
import { AuthProvider } from './contexts/authContexts';
import UserInfo from './components/UserInfo';
import ConnectSpotify from './components/ConnectSpotify';
import DatabaseHome from './components/databaseComponents/DatabaseHome';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { Profile } from './components/Profile';
import MatchPage from './components/MatchPage';
import ChatRoom from './components/ChatRoom';
import Submit from './components/SubmitData';
import Login from './components/Login'
import Team from './components/Team';
import AddMovies from './components/addMovies/AddMovies';
import UserHomePage from './components/userhome/UserHomePage';
import Addchannels from './components/Youtube/Addchannels';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spotifylink" element={<SpotifyLink />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/connectspotify" element={<ConnectSpotify />} />
          <Route path="/database" element={<DatabaseHome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/match" element={<MatchPage />} />
          <Route path="/submit" element={<Submit />} />
          <Route path="/team" element={<Team />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/addmovies" element={<AddMovies />} />
          <Route path="/userhomepage" element={<UserHomePage />} />
          <Route path="/addyoutubechannels" element={<Addchannels />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}