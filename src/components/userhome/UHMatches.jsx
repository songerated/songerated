import React from "react";
import { Card } from "@mui/material";
import { Typography } from "@mui/material";

const UHMatches = () => {
  return (
    <div>
      <center>
        <Card
          style={{
            width:"50hw",
            height: "100px",
            margin: "12px",
            padding: "12px",
          }}
        >
          <Typography>Your Matches</Typography>
        </Card>
      </center>
    </div>
  );
};

export default UHMatches;
