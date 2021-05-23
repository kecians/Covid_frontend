import React,{useState} from 'react'
import {useToasts} from 'react-toast-notifications'
import { Form, Button} from 'react-bootstrap' 
import {patientBedalloatment} from '../../Api/patient.api'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookies'
export default function Bedform(props) {
    const {addToast} = useToasts()
    const initialState = {
        patient_id: props.id,
        bed_number: '',
        bed_category: '',
        floor: '',
        ward: '',
        redirect: false

    }
    const [state, setState] = useState(initialState)
    const handleSubmit = event => {
        if (state.bed_category==="General Bed"){
            state.bed_category="1"
        }
        else if (state.bed_category==="Oxygen Bed"){
            state.bed_category="2"
        }
        else if (state.bed_category==="ICU Bed"){
            state.bed_category="3"
        }
        else{
            state.bed_category="4"
        }
        event.preventDefault();
        const eData={
            patient_id: state.patient_id,
            bed_number: state.bed_number,
            bed_category: state.bed_category,
            ward: state.ward,
            floor: state.floor
        }
        axios({
            url: patientBedalloatment,
            method: 'POST',
            data: eData,
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then(res=>{
            if (res.data.status===201){
              addToast(res.data.msg, { appearance: 'success' });
              document.getElementById("form1").reset();
              setState({ redirect: true});
            }
            else if (res.data.status===400){
                if(res.data.data.bed_number){
                    addToast(res.data.data.bed_number[0], { appearance: 'error' })
                }
                if(res.data.data.bed_category) {
                    addToast("Beds are full in this category!", { appearance: 'error' })
                }
              
            }
          })
          .catch(error => {
            setState({ redirect: false});
            console.log(error)
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
            <Form.Group  controlId="Patientid">
                <Form.Control 
                    type="text" 
                    placeholder="Patient id" 
                    value = {state.patient_id}
                    // name = 'patient_id'
                    readOnly
                    required
                    />
            </Form.Group>

            <Form.Group  controlId="ward">
                <Form.Control
                        as='select'
                        name='ward'
                        onChange={handleChange}
                        required
                    >
                        <option>Select Ward</option>
                        <option>A</option>
                        <option>B</option>
                       
                </Form.Control>
            </Form.Group>

            <Form.Group  controlId="floor">
                <Form.Control
                        as='select'
                        name='floor'
                        onChange={handleChange}
                        required
                    >
                        <option>Select Floor</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                </Form.Control>
            </Form.Group>

            <Form.Group controlId='bed_number'>
                <Form.Control
                    type='text'				                        
                    placeholder='Bed Number'                             
                    name='bed_number'
                    onChange={handleChange}
                    required
                    
                />
            </Form.Group>

            <Form.Group  controlId="Name">
                <Form.Control
                    as='select'
                    name='bed_category'
                    onChange={handleChange}
                    required
                >
                    <option>Select Bed Category</option>
                    <option>General Bed</option>
                    <option>Oxygen Bed</option>
                    <option>ICU Bed</option>
                    <option>Ventilators</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="button my-2 p-2">
                Submit
            </Button>
        </Form>
    )
}
