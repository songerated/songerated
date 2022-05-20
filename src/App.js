import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import SpotifyLink from './SpotifyLink';
import SignUp from './components/SignUp';
import UserInfo from './components/UserInfo';
import LogIn from './components/LogIn';

export default function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotifylink" element={<SpotifyLink />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/login" element={<LogIn />} />

      </Routes>
    </Router>
  );
}
