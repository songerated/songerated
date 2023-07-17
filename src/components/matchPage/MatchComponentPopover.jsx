import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Typography } from "@mui/material";
import { Card } from "@material-ui/core";
import Backdrop from '@mui/material/Backdrop';

const MatchComponentPopover = (props) => {
  return (
    <div style={{ width: "300px" }}>
      <center>
        <div style={{ background: "rgba(0,0,0,0)" }}>
          <KeyboardArrowUpIcon style={{ background: "rgba(0,0,0,0)" }} />
        </div>
      </center>
      <Card
        style={{
          borderRadius: "15px",
          width: "100%",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(0,    0, 0, 0.5)",
        }}
      >
        <Typography
          variant="subtitle1"
          style={{ margin: "16px 0px 8px 0px", color: "#ffff" }}
        >
          {props.email}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#ffff" }}>
          Matching Songs: {props.songs}
        </Typography>
        <Typography variant="subtitle2" style={{ color: "#ffff" }}>
          Matching Artists: {props.artists}
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ marginBottom: "16px", color: "#ffff" }}
        >
          Matching Movies: {props.movies}
        </Typography>
      </Card>
    </div>
  );
};

export default MatchComponentPopover;
