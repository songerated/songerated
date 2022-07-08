import React, { useEffect, useRef, useState } from 'react'
import {Form, Card, Alert} from 'react-bootstrap'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import {Link, useNavigate} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth } from "../contexts/authContexts"
import axios from 'axios';
import  {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import { getFirestore } from "firebase/firestore";



const auth =    firebase.auth();
const firestore = getFirestore;

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

export default function SignUp() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    
    const classes = useStyles();
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/spotifylink', {replace: false});
    const server_base_url = process.env.REACT_APP_SERVER_URL

    

    async function handleSubmit(e){
        e.preventDefault()
        
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
        }
        try {
            setError("")
            setLoading(true)
            var user = await signup(emailRef.current.value, passwordRef.current.value)

            console.log(user)
            const mail = emailRef.current.value
            var emailSplit = mail.split('@')
            var username = emailSplit[0]

            const { data } = await axios.get( server_base_url + "/usercreds", {
                headers: {
                },
                params: {
                    "name": username,
                    "email": mail,
                    "id": user.user.uid
                }
            })
            navigate("/connectspotify")
        } catch {
            setError("Failed to create an account")
        }
        setLoading(false)
    }

    

    const [user] = useAuthState(auth);
      
    /*hello*/
  return (
    <div className={classes.root}>
        <ResponsiveAppBar />
        <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email" style={{padding: '8px'}}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type = "email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password" style={{padding: '8px'}}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type = "password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm" style={{padding: '8px'}}>
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type = "password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <Box sx={{margin:'8px'}}>
                            <Button disabled={loading} className = "w-100" type = "submit" >Sign Up</Button>
                        </Box>
                        
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center-mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
        </Container>
   </ div>
   
  )
}





