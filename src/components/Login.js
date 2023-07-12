import React, { useEffect, useRef, useState } from "react";
import { Form, Card, Alert } from "react-bootstrap";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContexts";
import firebase from "firebase/compat/app";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";
import "../App.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import CircularProgress from "@mui/material/CircularProgress";


const style = {
  width: 297,
  height: 296,
};

const auth = firebase.auth();
const firestore = firebase.firestore();

const ContinueButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  backgroundColor: "#000",

  borderColor: "#000",
}));

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/temp3.png"})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
                setLoading(false)
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

  function SignIn() {
    const signInWithGoogle = () => {
      setLoading(true)
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };
    return (
      <Button
        variant="outlined"
        startIcon={<GoogleIcon />}
        style={{
          background: "#000",
          color: "#fff",
          width: "70%",
          margin: "16px",
        }}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className={classes.root}>
      {loading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress color="inherit" />
        </Box>
      ) : (<div
        style={{
          background: "rgba(230,    224, 227, 0.31)",
          display: "flex",
          width: "90%",
          height: "90vh",
        }}
      >
        <Stack direction="row" style={{ width: "100%" }}>
          <Card.Body>
            <center>
              <img
                src={process.env.PUBLIC_URL + "/assets/verselogo.png"}
                width="200px"
              ></img>
              <Typography variant="h6" color="rgba(5,5,5)">
                <b>WELCOME BACK</b>
              </Typography>
              <Typography variant="subtitle2" style={{ marginBottom: "16px" }}>
                Please enter your details
              </Typography>
              {error && <Alert variant="danger">{error}</Alert>}
              <Stack direction="column">
                <center>
                  <TextField
                    id="outlined-basic"
                    label="Enter your email"
                    variant="outlined"
                    size="small"
                    style={{ width: "70%" }}
                  />
                  <ContinueButton
                    variant="contained"
                    style={{ width: "70%", margin: "16px" }}
                    onClick={handleOnClick}
                  >
                    Continue
                  </ContinueButton>
                  <Divider style={{ width: "70%", margin: "8px" }}>OR</Divider>

                  <Box>
                    <center>
                      <SignIn />
                    </center>
                  </Box>
                  <div className="w-100 text-center-mt-2">
                    Need an account? <Link to="/signup">Sign Up</Link>
                  </div>
                </center>
              </Stack>
            </center>
          </Card.Body>
          <img
            src={process.env.PUBLIC_URL + "/assets/0104-modified.jpg"}
            width="60%"
            style={{ padding: "16px", objectFit: "cover" }}
          ></img>
        </Stack>
      </div>
      )}
    </div>
  );
}


