import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "react-bootstrap";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { useAuth } from "../contexts/authContexts";
import { link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import "../App.css";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Carousel } from "3d-react-carousal";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { SvgIcon } from "@mui/material";

const style = {
  width: 297,
  height: 296,
};

const auth = firebase.auth();
const firestore = firebase.firestore();

const url = `url(${process.env.PUBLIC_URL + "/assets/spaceship.jpg"})`;

let slides = [
  <img src="https://i.ibb.co/D8wx8r7/pngwing-com.png" alt="2" />,
  <img src="https://i.ibb.co/qDvvv9R/pngwing-com-10.png" alt="3" />,
  <img src="https://i.ibb.co/G02S2Bg/pngwing-com-3.png" alt="4" />,
  <img src="https://i.ibb.co/cFwVG5G/pngwing-com-9.png" alt="5" />,
  <img src="https://i.ibb.co/bdtHbTR/pngwing-com-11.png" alt="1" />,
];

const callback = function (index) {
  console.log("callback", index);
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `url(${
      process.env.PUBLIC_URL + "/assets/music_setup_blur.jpg"
    })`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  //const passwordConfirmRef = useRef()
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const server_base_url = process.env.REACT_APP_SERVER_URL;

  /* 
       Using the card and form feature in React Bootstrap, creating a form inside a card with 
      email and password with confirmation 
    */
  const classes = useStyles();
  const navigate = useNavigate();
  const handleOnClick = () => navigate("/spotifylink", { replace: true });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { data } = axios
          .get(server_base_url + "/usercreds", {
            headers: {},
            params: {
              name: user.displayName,
              email: user.email,
              id: user.uid,
            },
          })
          .then((res) => {
            axios
              .get(server_base_url + "/verifyuser", {
                params: {
                  id: user.uid,
                },
              })
              .then((res) => {
                if (res.data.length === 0) {
                  navigate("/connectspotify");
                } else {
                  navigate("/userhomepage");
                }
                console.log(user.uid);
              });
          });

        console.log(user.displayName);
        console.log(user.email);
        console.log("user" + user.uid);
      }
    });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);

      navigate("/connectspotify");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className={classes.root}>
      <center>
        <Stack
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
          spacing={0}
          sx={{ height: "100vh" }}
        >
          <div
            style={{
              width: "600px",
              height: "600px",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <center>
              <Carousel
                slides={slides}
                autoplay={true}
                interval={2000}
                onSlideChange={callback}
              />
            </center>
          </div>

          <Stack direction="column">
            <Typography variant="h4" color="rgba(5,5,5)" gutterBottom>
              WELCOME BACK
            </Typography>
            <Card
              style={{
                width: "400px",
              }}
            >
              <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="email" style={{ padding: "8px" }}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                  </Form.Group>
                  <Form.Group id="password" style={{ padding: "8px" }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                  </Form.Group>

                  <Box sx={{ margin: "8px" }}>
                    <Button disabled={loading} className="w-100" type="submit">
                      Sign in
                    </Button>
                  </Box>
                  <Divider variant="middle" />

                  <Box sx={{ margin: "8px" }}>
                    <center>
                      <SignIn />
                    </center>
                  </Box>
                </Form>
              </Card.Body>
            </Card>

            <div className="w-100 text-center-mt-2">
              Need an account? <Link to="/signup">Sign Up</Link>
            </div>
          </Stack>
        </Stack>
      </center>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <Button className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </Button>
  );
}
