import React, { useRef, useState } from 'react'
import {Form, Card, Alert} from 'react-bootstrap'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from 'react-bootstrap';
import Box from '@mui/material/Box';
import {Link, useNavigate} from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import { useAuth } from "../contexts/authContexts"

import { link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/music_setup_blur.jpg'})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
  }));

export default function Login() {
    const emailRef = useRef()
    const passwordRef = useRef()
    //const passwordConfirmRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    
    /* 
       Using the card and form feature in React Bootstrap, creating a form inside a card with 
      email and password with confirmation 
    */
    const classes = useStyles();
    const navigate = useNavigate();
    const handleOnClick = () => navigate('/spotifylink', {replace: true});

    async function handleSubmit(e){
        e.preventDefault()
        
       
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/connectspotify")
        } catch {
            setError("Failed to sign in")
        }
        setLoading(false)
    }
      
  return (
    <div className={classes.root}>
        <ResponsiveAppBar />
        <Container className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
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
                        

                        <Box sx={{margin:'8px'}}>
                            <Button disabled={loading} className = "w-100" type = "submit" >Login</Button>
                        </Box>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center-mt-2">
                Need an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        </Container>
   </ div>
   
  )
}
