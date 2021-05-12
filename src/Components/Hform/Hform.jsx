// import React,{useState, useEffect} from 'react'
import { Form, Col, Button} from 'react-bootstrap' 
export default function Hform(props) {
    // const [state, setState] = useState({})
    // useEffect(() => {
    //     setState(props)
    // }, [state, props])

    // let id;
    // let name;
    // if (state){
    //     id = state.props.match.params.id
    //     name = state.props.match.params.name
    // }

    // const initialState = {
    //     id: id,
    //     name: name,
    //     oxy_level: '',
    //     blood_pres_systolic: '',
    //     blood_pres_diastolic: '',
    //     temperature: ''

    // }
    // const [data, setData] = useState(initialState)

    return (
        <div className="container">
            <Form className="loginform">
                <Form.Row>

                    <Form.Group as={Col} controlId="Name">
                        <Form.Control type="text" placeholder="Name"  required/>
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

                
                <Form.Group controlId="blood_pres_systolic">
                    <Form.Control
                            type='text'
                            name='blood_pres_systolic'
                            placeholder='BP-Systolic'
                            required
                        >
                            
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='temp'>
                    <Form.Control
                            type='number'
                            name='temperature'
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
