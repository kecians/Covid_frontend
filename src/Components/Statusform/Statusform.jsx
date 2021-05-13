import React,{useState} from 'react'
import { Form, Button} from 'react-bootstrap' 
import {Redirect} from 'react-router-dom'
import {patientStatus, patientFacility} from '../../Api/patient.api'
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
import cookie from 'react-cookies'
export default function Statusform(props) {
    const {addToast} = useToasts()
    const initialState = {
        id: props.id,
        status: '',
        facility: ''
    }
    const [state, setState] = useState(initialState)
    const handleSubmit = event => {
        if (state.status==="Migrated"){
            state.status="M"
        }
        else{
            state.status="R"
        }
        event.preventDefault();
        const eData = { 
            status: state.status
          }
        axios({
            url: patientStatus+`${state.id}/`,
            method: 'PATCH',
            data: eData,
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then(res=>{
            if (res.data.status===200){
              addToast(res.data.msg, { appearance: 'success' });
              setState({ redirect: true});
            }
            else if (res.data.status===400){
              setState({ redirect: false});
              addToast("Error occurred try again!!", { appearance: 'error' });
            }
          })
          .catch(error => {
            setState({ redirect: false});
            console.log(error)
            addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
          });
          //  Facility change api

          const eda = { 
            facility: state.facility
          }
          axios({
            url: patientFacility+`${state.id}/`,
            method: 'PATCH',
            data: eda,
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then(res=>{
            if (res.data.status===200){
              addToast(res.data.msg, { appearance: 'success' });
              setState({ redirect: true});
            }
            else if (res.data.status===400){
              setState({ redirect: false});
              addToast("Error occurred try again!!", { appearance: 'error' });
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
        <div className="container">
            <Form className="loginform" onSubmit={handleSubmit} id="form">
                
                <Form.Group controlId='status'>
                    <Form.Control
                        as='select'
                        name='status'
                        required
                        onChange= { handleChange }
                    >
                        <option>Select Status</option>
                        <option>Migrated</option>
                        <option>Recovered</option>
                        
                    </Form.Control>
                </Form.Group>
                {state.status==="Migrated"?
                    <Form.Group controlId='facility'>
                    <Form.Control
                        as='textarea'
                        name='facility'
                        required
                        placeholder="Covid Facility"
                        rows="6"
                        onChange= { handleChange }
                    >                
                    </Form.Control>
                    </Form.Group>: null
                }
                
                <Button variant="primary" type="submit" className="button my-2 p-2">
                    Submit
                </Button>
            </Form>
        </div>
    )
}
