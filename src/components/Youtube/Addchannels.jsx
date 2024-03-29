import React from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import ChannelCard from "./ChannelCard";
import { makeStyles } from "@material-ui/core/styles";
import StepperComponent from ".././StepperComponent";
import YoutubeAccess from "./YoutubeAccess";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContexts";
import { Grid } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  multilineColor: {
    color: "green",
  },
}));
const Addchannels = () => {
  const navigate = useNavigate();
  const server_base_url = process.env.REACT_APP_SERVER_URL;

  const classes = useStyles();
  const { currentUser } = useAuth();
  const id = currentUser.uid;
  const [token, setToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [channelList, setChannelList] = useState([]);
  const [isChannels, setIsChannels] = useState(false);
  const [isAccessGranted, setIsAccessGranted] = useState(false);

  useEffect(() => {
    const hash = window.location.href;
    var tokent = hash;

    tokent = hash.split("?");
    tokent = tokent[1]?.split("&");
    tokent = tokent?.find((elem) => elem.startsWith("code"));
    tokent = tokent?.split("=")[1];

    if (tokent) {
      setIsAccessGranted(true);
      axios
        .get(server_base_url + "/getgoogletoken", {
          params: {
            code: `${tokent}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          setAccessToken(response.data.access_token);
          window.localStorage.setItem(
            "youtubeAccessToken",
            response.data.access_token
          );
        });
    }
    console.log(tokent);
  }, []);

  useEffect(() => {
    console.log("sdfsdsasfds");
    console.log(window.localStorage.getItem("youtubeAccessToken"));
    axios
      .get(
        "https://youtube.googleapis.com/youtube/v3/subscriptions?maxResults=50&part=snippet%2CcontentDetails&mine=true&key=AIzaSyBeKd2iinxLIEFceasDvpubSug-qQbn4Y8",
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              "youtubeAccessToken"
            )}`,
          },
        }
      )
      .then((response) => {
        var resTemp = response.data.items;
        resTemp.forEach((element) => {
          console.log(element.snippet.title);
        });
        setIsChannels(true);
        setChannelList(resTemp);
        console.log(channelList);
      });
  }, [accessToken]);

  const handleSubmit = () => {
    axios
      .post(server_base_url + "/addchannels", {
        channels: channelList,
        uid: id,
      })
      .then((response) => navigate("/match"));
  };

  const handlOnCliCk = () => {
    axios
      .get(server_base_url + "/getgoogleapiauthuri")
      .then((response) => (window.location.href = response.data));
  };

  return (
    <div className={classes.root} style={{ padding: "64px" }}>
      <div style={{ margin: "32px" }}>
        <StepperComponent activeStep={3}></StepperComponent>
      </div>
      {!channelList && (
        <center>
          <YoutubeAccess handleOnClick={handlOnCliCk} />
        </center>
      )}
      <center>
        <Grid container spacing={2}>
          {channelList?.map((channel) => {
            return (
              <Grid xs={4}>
                <div
                style={{
                  width: "70%",
                  height: "500px",
                  background: "rgba(230,    224, 227, 0.51)",
                  borderRadius: "15px",
                  margin: "16px",
                }}>
                <ChannelCard
                
                  title={channel.snippet.title}
                  publishedAt={channel.snippet.publishedAt}
                  description={channel.snippet.description}
                  imgsrc={channel.snippet.thumbnails.default.url}
                />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </center>

      {channelList && (
        <center>
          <Button onClick={handleSubmit} variant="outlined" style={{background:"#000", color:'#fff'}}>Submit</Button>
        </center>
      )}
    </div>
  );
};

export default Addchannels;
