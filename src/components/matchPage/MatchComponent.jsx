import * as React from "react";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Link, useNavigate } from "react-router-dom";
import { CardActionArea, Popover, Stack } from "@mui/material";
import { Popper } from "@mui/material";
import { useEffect, useState } from "react";
import MatchComponentPopover from "./MatchComponentPopover";
import { Backdrop } from "@mui/material";
function MatchComponent(props) {
  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  function handleOnclick() {
    window.localStorage.setItem("chatid", props.userid);
    navigate("/chat");
    console.log(props.userid);
  }

  let num = Math.floor(Math.random() * 100);
  num = num % 2;

  const songsCount = props.song == null ? 0 : props.song;
  const artistsCount = props.artist == null ? 0 : props.artist;
  const moviesCount = props.movie == null ? 0 : props.movie;

  return (
    <center>
      <div style={{backgroundColor:'rgba(230,    224, 227, 0.5)', borderRadius:'5px', margin:'8px'}}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <CardActionArea onClick={handleClick}>
            <Stack direction="column">
              <CardMedia
                component="img"
                sx={{
                  width: 150,
                  borderRadius: "50%",
                  margin: "32px 32px 0px 32px",
                }}
                image={"../../assets/" + num + ".png"}
                alt="Live from space album cover"
              />
              <Typography variant="h6">{props.name}</Typography>
              <Typography variant="subtitle2">{`Score: ${
                songsCount + moviesCount + artistsCount
              }`}</Typography>
            </Stack>
            
          </CardActionArea>
          
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            sx={{
              ".MuiPopover-paper": {
                background: "rgba(230,    224, 227, 0)",
                boxShadow: "none",
              },
            }}
          >
            <MatchComponentPopover
              email={props.email}
              songs={songsCount}
              movies={moviesCount}
              artists={artistsCount}
            />
          </Popover>
        </Box>
      </div>
    </center>
  );
}

export default MatchComponent;
