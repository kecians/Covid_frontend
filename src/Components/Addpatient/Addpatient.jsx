import React,{useState} from 'react'
import {useToasts} from 'react-toast-notifications'
import { Form, Button, Col} from 'react-bootstrap' 
import {patientAdmit} from '../../Api/patient.api'
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookies'
export default function Addpatient() {
    const {addToast} = useToasts()
    const initialState = {
        name: '',
        contact_number: '',
        gender: '',
        age: '',
        address: '',
        bed_number: '',
        patient_condition: '',
        bed_category: '',
        redirect: false

    }
    const [state, setState] = useState(initialState)
    const handleSubmit = event => {
        // For Gender
        if (state.gender==="Male"){
            state.gender="M"
        }
        else if (state.gender==="Female"){
            state.gender="F"
        }
        else if (state.gender==="Other"){
            state.gender="O"
        }
        //

        // For Patient condition 
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
        //
        
        // For bed Category

        if (state.bed_category==="General Bed"){
            state.bed_category="1"
        }
        else if (state.bed_category==="Oxygen Bed"){
            state.bed_category="2"
        }
        else if (state.bed_category==="ICU"){
            state.bed_category="3"
        }
        else{
            state.bed_category="4"
        }
        //
        event.preventDefault();
        const eData={
            name: state.name,
            contact_number: state.contact_number,
            gender: state.gender,
            age: state.age,
            address: state.address,
            bed_number: state.bed_number,
            health_condition: state.patient_condition,
            bed_category: state.bed_category,
        }
        if (typeof state.contact_number !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
          
            if (!pattern.test(state.contact_number)) {
                return addToast("Please enter valid phone number!", { appearance: 'error' });
          
            }else if(state.contact_number.length < 10){
                return addToast("Please enter valid phone number!", { appearance: 'error' });
            }
          
          }
          axios({
            url: patientAdmit,
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
              addToast("Bed Number Already Alloted!!", { appearance: 'error' });
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
                        type='text'				                        
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
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId='age'>
                    <Form.Control
                        type='text'				                        
                        placeholder='Age'                             
                        name='age'
                        onChange={handleChange}
                        required
                        
                    />
                </Form.Group>

            </Form.Row>
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
            <Form.Group controlId='bed_number'>
                    <Form.Control
                        type='text'				                        
                        placeholder='Bed Number'                             
                        name='bed_number'
                        onChange={handleChange}
                        required
                        
                    />
            </Form.Group>

            <Form.Group  controlId="category">
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
            <Form.Group controlId="address" >
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
