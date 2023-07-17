import MatchComponent from "./MatchComponent";
import { Stack, Typography } from "@mui/material";
import React from "react";

export const TopMatches = (props) => {
  return (
    <div style={{ width: "80%" }}>
      <Stack direction="column" style={{height:'30vh'}}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6"> Top Matches</Typography>
          <Typography variant="subtitle2">
            <ul>View all</ul>
          </Typography>
        </Stack>
        <Stack direction='row'>

        {
            props.users?.map((user) => (
                <MatchComponent
                userid={user[0].id}
                name={user[0].name}
                email={user[0].email}
                song={props.songCount[user[0].id]}
                artist={props.artistCount[user[0].id]}
                movie={props.movieCount[user[0].id]}
              />
            ))
        }
                </Stack>

      </Stack>
    </div>
  );
};
