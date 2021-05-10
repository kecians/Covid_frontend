import React from 'react'

import { Form, Button, Col} from 'react-bootstrap' 
export default function Addpatient() {
    return (
        <Form className="loginform">
            <Form.Row>

                <Form.Group as={Col} controlId="Name">
                    <Form.Control type="text" placeholder="Name" required/>
                </Form.Group>

                <Form.Group as={Col} controlId="Patientid">
                    <Form.Control type="text" placeholder="Patient id" required/>
                </Form.Group>

            </Form.Row>

            <Form.Group controlId='adhar_number'>
                    <Form.Control
                        type='number'				                        
                        placeholder='Adhar Number'                             
                        name='age'
                        required
                        
                    />
            </Form.Group>

            <Form.Group controlId='contact_number'>
                    <Form.Control
                        type='number'				                        
                        placeholder='Contact Number'                             
                        name='contact_number1'
                        required
                        
                    />
            </Form.Group>

            <Form.Group controlId='contact_number'>
                    <Form.Control
                        type='number'				                        
                        placeholder='Family Contact Number'                             
                        name='contact_number1'
                        required
                        
                    />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="Name">
                <Form.Control
                        as='select'
                        name='gender'
                        required
                    >
                        <option>Select Gender</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='contact_number'>
                    <Form.Control
                        type='number'				                        
                        placeholder='Age'                             
                        name='age'
                        required
                        
                    />
                </Form.Group>

            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1" >
                <Form.Control 
                    as="textarea"  
                    rows="6" 
                    name="address" 
                    placeholder="Address" 
                    required
                    />
            </Form.Group>	
            <Button variant="primary" type="submit" className="button my-2 p-2">
                Submit
            </Button>
        </Form>
    )
}
