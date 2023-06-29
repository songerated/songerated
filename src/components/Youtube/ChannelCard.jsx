import React from "react";

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
import { Stack } from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const ChannelCard = (props) => {
  const theme = useTheme();

  return (
    <Card
      sx={{ display: "flex" }}
      style={{
        margin: "1px",
        padding: "8px",
        borderRadius: "0",
        paddingLeft: "32px",
        height: "200px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <CardMedia
          component="img"
          style={{ width: 150, height: 150 }}
          image={props.imgsrc}
          alt="Live from space album cover"
        />
      </div>
      <Stack direction="row" justifyContent="space-between" width="100%">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack justifyContent="space-between" paddingLeft="16px">
            <Typography component="div" variant="h5">
              {props.title}
            </Typography>

            <Typography
              paragraph="true"
              variant="subtitle1"
              color="text.secondary"
              component="div"
              style={{
                textOverflow: "ellipsis",
                wordWrap: "break-word",
                overflow: "hidden",
                maxHeight: "3.6em",
                lineHeight: "1.8em",
              }}
            >
              {props.description}
            </Typography>

            <Typography
              variant="subtitle2"
              color="text.secondary"
              component="div"
            >
              Published At: + {props.publishedAt}
            </Typography>
          </Stack>
        </Box>

        <div style={{ display: "flex", alignItems: "center", margin:"32px" }}>
          <OpenInNewIcon />
        </div>
      </Stack>
    </Card>
  );
};

export default ChannelCard;
