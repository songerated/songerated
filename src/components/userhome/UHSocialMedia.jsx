import React from "react";
import { Card } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";

const UHSocialMedia = () => {
  return (
    <div>
      <center>
        <Card
          style={{
            height: "100px",
            margin: "12px",
            padding: "12px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ height: "75px" }}
          >
            <Stack
              direction="column"
              justifyContent="space-evenly"
              spacing={2}
              alignItems="center"
            >
              <Stack direction="row">
                <InstagramIcon />
                <Typography>Hello</Typography>
              </Stack>
              <Stack direction="row">
                <FacebookIcon />
                <Typography>Hello</Typography>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              justifyContent="space-around"
              spacing={2}
              alignItems="center"
            >
              <Stack direction="row">
                <TwitterIcon />
                <Typography>Hello</Typography>
              </Stack>
              <Stack direction="row">
                <YouTubeIcon />
                <Typography>Hello</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Card>
      </center>
    </div>
  );
};

export default UHSocialMedia;
