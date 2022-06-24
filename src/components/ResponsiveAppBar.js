import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import MusicVideoTwoToneIcon from '@mui/icons-material/MusicVideoTwoTone';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Router, Routes, Route, useNavigate } from 'react-router-dom';
import  Home  from '../Home'
import { useAuth } from '../contexts/authContexts';
import { useState } from 'react';



const pages = ['Home', 'About', 'Team'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});




const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const {logout} = useAuth()
  const [error, setError] = useState("")


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  async function handleLogout(){
    setError('')

    try{
      await logout()
      navigate("/login")
    }catch{
      setError('Failed to log out')
    }
  }

  const handleHome = () => {
    let path = `/`
    navigate('/',{replace:false});
  }
  const handleAbout = () => {
    navigate('/',{replace:false});
  }
  const handleTeam = () => {
    navigate('/',{replace:false});
  }


  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar position="static" sx={{ bgcolor: "transparent" }} enableColorOnDark>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MusicVideoTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VERSE
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
               {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))} 
              
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VERSE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                key={pages[0]}
                onClick={event =>  window.location.href='/'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[0]}
              </Button>
              <Button
                key={pages[1]}
                onClick={event =>  window.location.href='/'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[1]}
              </Button>
              <Button
                key={pages[2]}
                onClick={event =>  window.location.href='/'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {pages[2]}
              </Button>
           
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}
              <MenuItem key={settings[0]} onClick={event =>  window.location.href='/profile'}>
                  <Typography textAlign="center">{settings[0]}</Typography>
              </MenuItem>

              
              
              

              <MenuItem key={settings[3]} onClick={handleLogout}>
                  <Typography textAlign="center">{settings[3]}</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  );
};
export default ResponsiveAppBar;
