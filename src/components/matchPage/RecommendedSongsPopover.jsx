import React from "react";
import RecommendedSongsTable from "./RecommendedSongsTable";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  multilineColor: {
    color: "green",
  },
  popoverRoot: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&.MuiPopover-paper": {
      background: "transparent",
    },
  },
}));

const RecommendedSongsPopover = (props) => {
  const classes = useStyles();

  const [popoverOpen, setPopoverOpen] = useState(true);

  const handleClose = () => {
    setPopoverOpen(false);
  };

  console.log(props.recommendedSongs)
  return (
    <Popover
      open={popoverOpen}
      onClose={handleClose}
      onClick={props.popoverClick}
      style={{ width: "100%" }}
      classes={{
        root: classes.popoverRoot,
      }}
      anchorReference="none"
      sx={{
        ".MuiPopover-paper": {
          background: "rgba(230,    224, 227, 0.31)",
          boxShadow: "none",
          overflow: "hidden",
          width: "100%",
          borderRadius: "15px",
        },
      }}
    >
      {
        <div style={{ margin: "48px" }}>
          <div
            style={{
              padding: "16px",
              background: "rgba(230,    224, 227, 0.91)",
              marginBottom: "8px",
            }}
          >
            <center>
              <Typography variant="h6">
                Our AI Model generated some songs based on your top Artists and
                top Songs <br />
              </Typography>
            </center>
          </div>
          <Box
            sx={{
              bgcolor: "transparent",
              margin: "auto",
              overflowY: "auto",
              width: "100%",
              height: "100vh",
            }}
          >
            <RecommendedSongsTable recommendedSongs={props.recommendedSongs} />
          </Box>
        </div>
      }
    </Popover>
  );
};

export default RecommendedSongsPopover;
