import React,{useState} from 'react'
import { Form, Col, Button, Spinner} from 'react-bootstrap' 
import {Redirect} from 'react-router-dom'
import {patientHealth} from '../../Api/health.api'
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
import cookie from 'react-cookies'
import { useDispatch } from 'react-redux'
import { PATIENT_HEALTH_UPDATED, PATIENT_STATUS_CHANGE } from '../../Redux/types/patient'
import { PrimaryButton } from '../RUCApi/Button'

export default function Hform(props) {
    const {addToast} = useToasts()
    const initialState = {
        id: props.id,
        name: props.name,
        oxy_level: '',
        blood_pres_systolic: '',
        temperature: '',
        patient_condition: '',
        pulse_rate: '',
        respiration_rate: '',
        redirect: false

    }
    const dispatch = useDispatch()
    const {
        setUpdate
    } = props
    const [state, setState] = useState(initialState)
    const [loading, setLoading] = useState(false)
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
            patient_condition: state.patient_condition,
            pulse_rate: state.pulse_rate,
            respiration_rate: state.respiration_rate
            
          }
        setLoading(true)
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
                setLoading(false)
                addToast(res.data.msg, { appearance: 'success' });
                // setState({ redirect: true});
                dispatch( { type : PATIENT_STATUS_CHANGE, payload : true})

                setTimeout(() => {
                    dispatch( { type : PATIENT_STATUS_CHANGE, payload : false})

                }, 1000 )
                setUpdate(false)
            }
            else if (res.data.status===400){
                setState({ redirect: false});
                setLoading(false)
                if(res.data.data.blood_pres_diastolic){
                    addToast("Please fill Blood Pressure correctly!", { appearance: 'error' })
                }   
                else{
                    addToast("Please check your form correctly before submitting!", { appearance: 'error' });
                }
                
            }
          })
          .catch(error => {
            setLoading(false)
            setState({ redirect: false});
            addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
          });
          
      }
      const handleChange = event =>{
        setState({ ...state, [event.target.name]: event.target.value,         
        });
      }

    if (state.redirect){
        return <Redirect to='/dashboard' />
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
                            readOnly
                            required/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="Patientid">
                        <Form.Control 
                            type="text" 
                            placeholder="Patient id" 
                            value = {state.id}
                            readOnly
                            name = 'username'
                            required/>
                    </Form.Group>

                </Form.Row>

                <Form.Group controlId=''>
                        <Form.Control
                            type='number'				                        
                            placeholder='SPO2 Level'                             
                            name='oxy_level'
                            value = {state.oxy_level}
                            onChange= { handleChange }
                            required
                        />
                </Form.Group>

                <Form.Group controlId=''>
                        <Form.Control
                            type='number'				                        
                            placeholder='Pulse Rate'                             
                            name='pulse_rate'
                            value = {state.pulse_rate}
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
                            value={state.temperature}
                            placeholder='Temperature'
                            onChange= { handleChange }
                            required
                        />
                </Form.Group>

                <Form.Group controlId='respiration_rate'>
                    <Form.Control
                            type='number'
                            name='respiration_rate'
                            placeholder='Respiratory Rate'
                            value={state.respiration_rate}
                            onChange= { handleChange }
                            required
                        />
                </Form.Group>
                <PrimaryButton variant="primary" type="submit"  >
                {loading ? 
                    <>
                    <span>Loading.....</span>
                    <Spinner animation="border" size="lg" className=""/>
                    </>: "Submit"
                  }
                </PrimaryButton>
            </Form>
        </div>
    )
}
