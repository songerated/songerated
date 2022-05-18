import React from 'react'
import {Form, Button, Card} from 'react-bootstrap'

export default function SignUp() {
  return (
    <>
    /*Using the card and form feature in React Bootstrap, creating a form inside a card with 
    email and password with confirmation */
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type = "email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type = "password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                    <Form.Label>Password Confirmation</Form.Label>
                    <Form.Control type = "email" ref={passwordConfirmRef} required />
                </Form.Group>
                <Button className = "w-100" type = "submit">Sign Up</Button>
            </Card.Body>
        </Card>
        <div className="w-100 text-center-mt-2">
            Already have an account? Login
        </div>
    </>
  )
}