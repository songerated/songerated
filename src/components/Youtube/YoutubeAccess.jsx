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
    <Card style={{ margin: "32px" , width:'40%', padding:'32px', background:'rgba(230, 224, 227, 0.41)', borderRadius:'15px'}}>
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
        <Typography variant="body1">
          
 The final step involves providing us with information regarding your YouTube subscriptions. Upon granting us access, the YouTube API will transmit a comprehensive list of the channels to which you are subscribed.
        </Typography>
      </CardContent>
        <CardActions style={{justifyContent:'center'}}>
        <center>

          <Button size="small" variant=
        "outlined" onClick={props.handleOnClick} style={{background:'#000', color:'#fff', borderColor:'#000'}}>Grant Access</Button>
          </center>

        </CardActions>
    </Card>
  );
};

export default YoutubeAccess;
