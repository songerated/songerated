import React from 'react';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Home';
import SpotifyLink from './SpotifyLink';
import SignUp from './components/SignUp';
<<<<<<< HEAD
import { AuthProvider } from './contexts/authContexts';
=======
import UserInfo from './components/UserInfo';
import ConnectSpotify from './components/ConnectSpotify';
>>>>>>> 4057d840f971fef8da5a2cbf863bb5546816b94b

export default function App() {

  return (
<<<<<<< HEAD
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/spotifylink" element={<SpotifyLink />} />
          <Route path="/signup" element={<AuthProvider><SignUp /></AuthProvider>} />
        </Routes>
      </Router>
    
=======

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spotifylink" element={<SpotifyLink />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/connectspotify" element={<ConnectSpotify />} />

      </Routes>
    </Router>
>>>>>>> 4057d840f971fef8da5a2cbf863bb5546816b94b
  );
}
