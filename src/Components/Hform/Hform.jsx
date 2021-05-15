import React,{useState} from 'react'
import { Form, Col, Button} from 'react-bootstrap' 
import {Redirect} from 'react-router-dom'
import {patientHealth} from '../../Api/health.api'
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
import cookie from 'react-cookies'
export default function Hform(props) {
    const {addToast} = useToasts()
    const initialState = {
        id: props.id,
        name: props.name,
        oxy_level: '',
        blood_pres_systolic: '',
        temperature: '',
        patient_condition: '',
        redirect: false

    }
    const [state, setState] = useState(initialState)
    const handleSubmit = event => {
        event.preventDefault();
        if (state.patient_condition==="Asymptomataic"){
            state.patient_condition=1
        }
        else if (state.patient_condition==="Mild"){
            state.patient_condition=2
        }
        else if (state.patient_condition==="Moderate"){
            state.patient_condition=3
        }
        else{
            state.patient_condition=4   
        }
        
        const eData = { 
            username: state.id,
            oxy_level: state.oxy_level, 
            blood_pres_systolic: state.blood_pres_systolic.split('/')[0],
            blood_pres_diastolic: state.blood_pres_systolic.split('/')[1],
            temperature: state.temperature,
            patient_condition: state.patient_condition
            
          }
        axios({
            url: patientHealth,
            method: 'POST',
            data: eData,
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then(res=>{
            if (res.data.status===201){
              addToast(res.data.msg, { appearance: 'success' });
              document.getElementById("form").reset();
              setState({ redirect: true});
            }
            else if (res.data.status===400){
              setState({ redirect: false});
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
        <div className="container">
            <Form className="loginform" onSubmit={handleSubmit} id="form">
                <Form.Row>

                    <Form.Group as={Col} controlId="Name">
                        <Form.Control 
                            type="text" 
                            placeholder="Name" 
                            value = {state.name}
                            name = 'name'
                            required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Patientid">
                        <Form.Control 
                            type="text" 
                            placeholder="Patient id" 
                            value = {state.id}
                            name = 'username'
                            required/>
                    </Form.Group>

                </Form.Row>

                <Form.Group controlId=''>
                        <Form.Control
                            type='number'				                        
                            placeholder='SPO2 Level'                             
                            name='oxy_level'
                            onChange= { handleChange }
                            required
                        />
                </Form.Group>

                
                <Form.Group controlId="blood_pres_systolic">
                    <Form.Control
                            type='text'
                            name='blood_pres_systolic'
                            placeholder='Blood Pressure (ex.120/80)'
                            onChange= { handleChange }
                            required
                        >
                            
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='patient_condition'>
                    <Form.Control
                        as='select'
                        name='patient_condition'
                        required
                        onChange= { handleChange }
                    >
                        <option>Select</option>
                        <option>Asymptomataic</option>
                        <option>Mild</option>
                        <option>Moderate</option>
                        <option>Severe</option>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='temp'>
                    <Form.Control
                            type='number'
                            name='temperature'
                            placeholder='Temperature'
                            onChange= { handleChange }
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
