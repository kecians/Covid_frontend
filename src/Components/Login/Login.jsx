// import dependencies
import React from 'react'
import {Link } from 'react-router-dom'
// import components
import { Form, Button} from 'react-bootstrap'
import './Login.scss'
export default function Login() {
    return (
        <>
        
            <Form className="loginform">
                <Form.Group controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter Userid" />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="button my-2 p-2">
                    Submit
                </Button>
                <div className="text-center">or</div>
                <Link to='/signup' variant="light" type="submit" className="searchbarcontainer button my-2 p-2 text-center">
                   Register
                </Link>
            </Form>
        </>
    )
}
