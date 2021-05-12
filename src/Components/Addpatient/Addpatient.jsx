import React,{useState} from 'react'
import {useToasts} from 'react-toast-notifications'
import { Form, Button, Col} from 'react-bootstrap' 
import {patientAdmit} from '../../Api/patient.api'
import axios from 'axios'
import {Redirect} from 'react-router-dom'

export default function Addpatient() {
    const {addToast} = useToasts()
    const initialState = {
        name: '',
        contact_number: '',
        gender: '',
        age: '',
        address: '',
        redirect: false

    }
    const [state, setState] = useState(initialState)
    const handleSubmit = event => {
        if (state.gender==="Male"){
            state.gender="M"
        }
        else if (state.gender==="Female"){
            state.gender="F"
        }
        else if (state.gender==="Other"){
            state.gender="O"
        }
        event.preventDefault();
        axios.post(patientAdmit , { 
            name: state.name,
            contact_number: state.contact_number,
            gender: state.gender,
            age: state.age,
            address: state.address,
            
          })
          .then(res=>{
            if (res.data.status===201){
              addToast(res.data.msg, { appearance: 'success' });
              document.getElementById("form1").reset();
              setState({ redirect: true});
            }
            else if (res.data.status===400){
              addToast("Error occurred try again!!", { appearance: 'error' });
            }
          })
          .catch(error => {
            setState({ redirect: false});
            addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
          });
          
      }
      const handleChange = event =>{
        setState({ ...state, [event.target.name]: event.target.value,         
        });
      }

    if (state.redirect){
        return <Redirect to='/list' />
    }

    return (
        <Form className="loginform" onSubmit={handleSubmit} id="form1">
            <Form.Group  controlId="Name">
                <Form.Control 
                    type="text" 
                    placeholder="Name" 
                    name="name"
                    onChange={handleChange}
                    required/>
            </Form.Group>


            <Form.Group controlId='contact_number'>
                    <Form.Control
                        type='number'				                        
                        placeholder='Contact Number'                             
                        name='contact_number'
                        onChange={handleChange}
                        required
                        
                    />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="Name">
                <Form.Control
                        as='select'
                        name='gender'
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                    onChange={handleChange}
                    required
                    />
            </Form.Group>	
            <Button variant="primary" type="submit" className="button my-2 p-2">
                Submit
            </Button>
        </Form>
    )
}
