import React from "react";

import { useTheme } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ChannelCard = (props) => {
  const theme = useTheme();

  return (
    <div style={{ height: "100%" }}>
      <Stack
        direction="column"
        style={{
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "60%" }}
          style={{
            borderRadius: "15px",
            margin: "16px",
            border: "2px solid #dadada",
            outline: "none",
            borderColor: "#303233",
            boxShadow: "0 0 10px #303233",
          }}
          image={props.imgsrc}
          alt="channel Poster"
        />

        <Typography varient="h5">
          <b> {props.title}</b>
        </Typography>
        <Typography
          variant="subtitle1"
          style={{
            textOverflow: "ellipsis",
            wordWrap: "break-word",
            overflow: "hidden",
            maxHeight: "3.6em",
            lineHeight: "1.8em",
            textAlign: "center",
            paddingLeft: "32px",
            paddingRight: "32px",
            paddingBottom: "16px",
          }}
        >
          {" "}
          {props.description}
        </Typography>
      </Stack>
    </div>
  );
};

export default ChannelCard;
