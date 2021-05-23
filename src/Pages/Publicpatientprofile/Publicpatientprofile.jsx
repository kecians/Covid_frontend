import React,{useState} from 'react'
// import {useToasts} from 'react-toast-notifications'
import { Form, Button} from 'react-bootstrap' 
// import {patientProfile} from '../../Api/patient.api'
import Heading from '../../Components/Heading/Heading'
// import axios from 'axios'
import {Link} from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
export default function Publicpatientprofile() {
    // const {addToast} = useToasts()
    const [state, setState] = useState({query: '', contact: ''})
      const handleChange = event =>{
        setState({ ...state, [event.target.name]: event.target.value,         
        });
      }

    return (
        <>
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
                        <Form.Group  controlId="Patientid">
                            <Form.Control 
                                type="password" 
                                placeholder="Patient Password" 
                                name = 'contact'
                                onChange={handleChange}
                                required
                                />
                        </Form.Group>
                        <Link to={`/patient/profile/${state.query}/${state.contact}`}>
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
        <div className="container-fluid p-0 m-0 pt-5 bg-silver">
        <Footer />  
        </div>
    </>
    )
}
