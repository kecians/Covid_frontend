import React from 'react'

import { Form, Col, Button} from 'react-bootstrap' 
export default function Hform() {
    return (
        <div className="container">
            <Form className="loginform">
                <Form.Row>

                    <Form.Group as={Col} controlId="Name">
                        <Form.Control type="text" placeholder="Name" required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Patientid">
                        <Form.Control type="text" placeholder="Patient id" required/>
                    </Form.Group>

                </Form.Row>

                <Form.Group controlId=''>
                        <Form.Control
                            type='number'				                        
                            placeholder='SPO2 Level'                             
                            name='oxy_level'
                            required
                        />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="blood_pres_systolic">
                    <Form.Control
                            type='number'
                            name='blood_pres_systolic'
                            placeholder='BP-Systolic'
                            required
                        >
                            
                    </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId='blood_pres_diastolic'>
                        <Form.Control
                                type='number'
                                name='blood_pres_diastolic'
                                placeholder='BP-Diastolic'
                                required
                            />
                    </Form.Group>

                </Form.Row>
                <Form.Group controlId='temp'>
                    <Form.Control
                            type='number'
                            name='temp'
                            placeholder='Temperature'
                            required
                        />
                </Form.Group>
                <Button variant="primary" type="submit" className="button my-2 p-2">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
