import React,{useState} from 'react'
// import {useToasts} from 'react-toast-notifications'
import { Form, Button} from 'react-bootstrap' 
// import {patientProfile} from '../../Api/patient.api'
import Heading from '../../Components/Heading/Heading'
// import axios from 'axios'
import {Link} from 'react-router-dom'
export default function Publicpatientprofile() {
    // const {addToast} = useToasts()
    const [state, setState] = useState({query: ''})
      const handleChange = event =>{
        setState({ ...state, [event.target.name]: event.target.value,         
        });
      }

    return (
        <div className="container-fluid bg-silver p-4">
            <Heading heading="Goberdhan Tiwari Government Base Hospital, Almora"/>
            <hr className="mt-4"/>
            <div className="container">
            <Heading heading="Patient Profile"/>
                <div className="row">
                    <div className="col-md-3 col-sm-3 col-lg-3"></div>
                    <div className="col-md-6 col-sm-6 col-lg-6 col-12">

                    <Form className="loginform" id="form1">
                        <Form.Group  controlId="Patientid">
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Patient id" 
                                        name = 'query'
                                        onChange={handleChange}
                                        required
                                        />
                                </Form.Group>
                        <Link to={`/patient/profile/${state.query}`}>
                            <Button variant="primary" className="button my-2 p-2">
                                Submit
                            </Button>
                        </Link>
                    </Form>
                    </div>
                    <div className="col-md-3 col-sm-3 col-lg-3"></div>
                </div>
            </div>
        </div>
    )
}
