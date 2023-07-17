import MatchComponent from "./MatchComponent";
import { Stack, Typography } from "@mui/material";
import React from "react";
import {Grid} from "@mui/material";

export const TopMatches = (props) => {
  return (
    <div style={{marginTop:'16px', backgroundColor:'rgba(0,    0, 0, 0.1)', margin:'8px', padding:'24px', borderRadius:'15px' }}>
      <Stack direction="column" style={{ }}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6"> Top Matches</Typography>
          <Typography variant="subtitle2">
            <ul>View all</ul>
          </Typography>
        </Stack>
        <Grid container style={{justifyContent:'center', marginTop:'16px'}}>

          {props.users?.map((user) => (

            <MatchComponent
              userid={user[0].id}
              name={user[0].name}
              email={user[0].email}
              song={props.songCount[user[0].id]}
              artist={props.artistCount[user[0].id]}
              movie={props.movieCount[user[0].id]}
            />
          ))}
          
          </Grid>
      </Stack>
    </div>
  );
};
