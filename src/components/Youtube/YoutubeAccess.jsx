import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import YouTubeIcon from "@mui/icons-material/YouTube";

const YoutubeAccess = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "32px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        style={{ height: "150px", width: "150px" }}
        image="https://i.ibb.co/K6XGLyH/youtubelogo.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Subscriptions List
        </Typography>
        <Typography variant="body2" color="text.secondary">
          The Last step is to help us know about your Youtube taste. Once you
          grant us access, the Youtube API sends us a list of all your channel
          subscriptions.
        </Typography>
      </CardContent>
        <CardActions style={{justifyContent:'center'}}>
        <center>

          <Button size="small" onClick={props.handleOnClick}>Grant Access</Button>
          </center>

        </CardActions>
    </Card>
  );
};

export default YoutubeAccess;
