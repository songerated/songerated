import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/authContexts';
import { auth } from '../firebase';
import ResponsiveAppBar from './ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontFamily: 'Nunito',
  },
  appbar: {
    background: 'none',
  },
  appbarWrapper: {
    width: '80%',
    margin: '0 auto',
  },
  appbarTitle: {
    color:'#000000',
    flexGrow: '1',
  },
  icon: {
    color: '#000000',
    fontSize: '2rem',
  },
  colorText: {
    color: '#0d224d',
  },
  container: {
    textAlign: 'center',
  },
  title: {
    color: '#000000',
    fontSize: '4.5rem',
  },
  goDown: {
    color: '#0d224d',
    fontSize: '4rem',
  },
}));
export default function Header(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const {currentUser} = useAuth();
  useEffect(() => {
    setChecked(true);
  }, []);

  const navigate = useNavigate();
  const handleOnClick = () => {
    if(auth.currentUser!= null) {
      auth.signOut().then(() => {
        navigate('/', {replace: false});
      })
    }else{
      navigate('/login', {replace: false});
    }
  }
  return (

    <div className={classes.root} id="header">
      {props.name == 'Sign Out' && (
        <ResponsiveAppBar/>
      )}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            Ver<span className={classes.colorText}>se.</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
          <Button variant="contained" onClick={handleOnClick}>
            {props.name}
          </Button>
        </Toolbar>
      </AppBar>

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        <div className={classes.container}>
          <h1 className={classes.title}>
            Welcome to <br />
            Ver<span className={classes.colorText}>se.</span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>
  );
}
