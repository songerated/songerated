import React from 'react'
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from '@mui/icons-material/Dashboard';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { useAuth } from "../../contexts/authContexts";
import { auth } from "../../firebase";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { useState } from 'react';

var iconList = [<DashboardIcon/>, <MovieFilterIcon/>, <LibraryMusicIcon/>, <ConnectWithoutContactIcon/> ]
const drawerWidth = 300;
let photo = null;

const CustomDrawer = (props) => {

  const { currentUser } = useAuth();
  const mail = currentUser.email;
  const [selectedButton, setSelectedButton] = useState(0)

  const handleDrawerItemClick = (index) => {
    props.change(index)
    setSelectedButton(index)
  }

  if (auth.currentUser !== null) {
    let { uid, photoURL } = auth.currentUser;
    photo = photoURL;
  }

  return (
    <div>
      <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <center>
              <Avatar
                sx={{ width: 100, height: 100, margin: "32px" }}
                src={photo || "https://i.ibb.co/rt2D67C/pngwing-com.png"}
              />
              <Typography variant="h5">{auth.currentUser.displayName}</Typography>
              <Typography >{mail}</Typography>
            </center>

            <List>
              {["Dashboard", "Movies", "Music", "Youtube","Your Profile"].map(
                (text, index) => (
                  <ListItem   key={text} disablePadding>
                    <ListItemButton selected={selectedButton == index} onClick={e => handleDrawerItemClick(index)} key={index} >
                      <ListItemIcon>
                        {iconList[index]}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                )
              )}
            </List>
            <Divider/>
            
          </Box>
        </Drawer>
    </div>
  )
}

export default CustomDrawer
