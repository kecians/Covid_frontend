import React from 'react'

import { Form, Button
 } from 'react-bootstrap' 
export default function Register() {
    return (
        <>
        <Form className="loginform">
            <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" placeholder="Enter Userid" />
                <Form.Text className="text-muted ml-4">
                    This should be your phone number or some unique id.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="password2"
                    required
                />
            </Form.Group>
            <Form.Group controlId='staff'>
                <Form.Control
                    as='select'
                    name='Select Staff'
                    required
                >
                    <option>Select</option>
                    <option>Nurse</option>
                    <option>Doctor</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="button my-2 p-2">
                Submit
            </Button>
            <div className="text-center">or</div>
            <Button variant="light" type="submit" className="searchbarcontainer button my-2 p-2">
                Login
            </Button>
        </Form>
        </>
    )
}
