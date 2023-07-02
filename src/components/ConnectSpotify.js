import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Spotifyhtml from "./Spotifyhtml.js";
import StepperComponent from "./StepperComponent";

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
export default function ConnectSpotify() {
  const classes = useStyles();

  return (
    <div
      class={classes.root}
      style={{ backgroundColor: "rgba(230, 224, 227, 0.21)" }}
    >
      <div
        style={{
          paddingTop: "64px",
        }}
      >
        <StepperComponent activeStep={0}></StepperComponent>
      </div>
      <Spotifyhtml />
    </div>
  );
}
