import React,{useState} from 'react'
import { Form, Button, Spinner} from 'react-bootstrap' 
import {Redirect} from 'react-router-dom'
import {patientStatus, patientMigration, patientDeath} from '../../Api/patient.api'
import axios from 'axios'
import {useToasts} from 'react-toast-notifications'
import cookie from 'react-cookies'
export default function Statusform(props) {
  const {addToast} = useToasts()
  console.log(props)
  const initialState = {
      id: props.id,
      status: '',
      migrated_to: '',
      expired_on: '',
      reason: ''
  }
  const initialState1={
    bed_number: '',
    bed_category: '',
    floor: '',
    ward: '',
  }
  const info2 = {
    "Paediatric": "P",
    "Obs & Gynae": "OG",
    "A": "A",
    "B": "B"
}
  const [state, setState] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [bed, setBed] = useState(initialState1)
  const handleSubmit = event => {
    event.preventDefault();

      // For Patient Condition 

      if (state.status==="Referred"){
          state.status="M"
      }
      else if (state.status==="Death"){
        state.status="D"
      }
      else if(state.status==="Home Isolated"){
        state.status="H"
      }
      else if(state.status==="Hospitalized"){
        state.status="A"
      }
      else if (state.status==="Recovered"){
          state.status="R"
      }
      else{
        state.status=""
      }

      //  For Bed Category
      if (bed.bed_category==="General Bed"){
        bed.bed_category="1"
      }
      else if (bed.bed_category==="Oxygen Bed"){
          bed.bed_category="2"
      }
      else if (bed.bed_category==="ICU Bed"){
          bed.bed_category="3"
      }
      else if(bed.bed_category==="Ventilators"){
          bed.bed_category="4"
      }
      else{
          bed.bed_category=""
      }

      bed.ward=info2[bed.ward]
      const eData = { 
          patient_status: state.status,
      }
      setLoading(true)
      axios({
          url: patientStatus+`${props.id}/`,
          method: 'PATCH',
          data: eData,
          headers: {
            Authorization: `Token ${cookie.load('token')}`,
          },
        })
        .then(res=>{
          if (res.data.status===200){
            setLoading(false)
            addToast(res.data.msg, { appearance: 'success' });
            setState({...state, redirect: true});
            if (state.status==="D" && state.reason.length!==0){
              const eda = { 
                reason: state.reason,
                patient_id: props.id,
                expired_on: state.expired_on
              }
              axios({
                url: patientDeath,
                method: 'POST',
                data: eda,
                headers: {
                  Authorization: `Token ${cookie.load('token')}`,
                },
              })
              .then(res=>{
                if (res.data.status===200){
                  addToast(res.data.msg, { appearance: 'success' });
                  setState({...state, redirect: true});
                }
                else if (res.data.status===400){
                  setState({...state, redirect: true});
                  addToast("Error occurred try again!!", { appearance: 'error' });
                }
              })
              .catch(error => {
                setState({...state, redirect: true});
                console.log(error)
                addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
              });
            }
            else if (state.status==="M" && (state.migrated_to.length!==0 || state.reason.length!==0)){
              const eda = { 
                migrated_to: state.migrated_to,
                reason: state.reason,
                patient_id: props.id
              }
              axios({
                url: patientMigration,
                method: 'POST',
                data: eda,
                headers: {
                  Authorization: `Token ${cookie.load('token')}`,
                },
              })
              .then(res=>{
                if (res.data.status===200){
                  addToast(res.data.msg, { appearance: 'success' });
                  setState({...state, redirect: true});
                }
                else if (res.data.status===400){
                  setState({...state, redirect: false});
                  addToast("Error occurred try again!!", { appearance: 'error' });
                }
              })
              .catch(error => {
                setState({...state, redirect: false});
                console.log(error)
                addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
              });
            }
          }
          else if (res.data.status===400){
            setLoading(false)
            setState({...state, redirect: false});
            if(res.data.data.bed_number){
              addToast(res.data.data.bed_number[0], { appearance: 'error' })
            }
            addToast("Error occurred try again!!", { appearance: 'error' });
          }
        })
        .catch(error => {
          if(error.response.data.bed_category) {
            addToast("Beds are full in this category!", { appearance: 'error' })
           
          }
          else if(error.response.data.bed_number) {
            addToast("Bed is already allotted!", { appearance: 'error' })
           
          }
          else{
            addToast('The server is not excepting any request at this moment!! Try again later', { appearance: 'error' });
          }
          setLoading(false)
          setState({...state, redirect: false});
          
        });
          
        
        
        
    }
    const handleChange = event =>{
      setState({ ...state, [event.target.name]: event.target.value,         
      });
    }

    const handlebedChange = event =>{
      setBed({ ...bed, [event.target.name]: event.target.value,         
      });
    }

    if (state.redirect){
        return <Redirect to='/list' />
    }
    console.log(state)
    console.log(bed)
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
                        <option>Referred</option>
                        <option>Recovered</option>
                        <option>Death</option>
                        <option>Home Isolated</option>
                        <option>Hospitalized</option>
                        
                    </Form.Control>
                </Form.Group>
                {state.status==="Referred" || state.status==="R"?
                    <>
                    <Form.Group controlId='reason'>
                      <Form.Control
                          as='textarea'
                          name='reason'
                          required
                          placeholder="Cause of migration...."
                          rows="3"
                          onChange= { handleChange }
                      >                
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='migrated_to'>
                    <Form.Control
                        as='textarea'
                        name='migrated_to'
                        required
                        placeholder="Referred to...."
                        rows="4"
                        onChange= { handleChange }
                    >                
                    </Form.Control>
                    </Form.Group>
                    
                    </>
                    : null
                }
                {state.status==="Death"|| state.status==="D"?
                    <>
                    <Form.Group controlId='ex'>
                      <Form.Control
                          type="date"
                          name='expired_on'
                          required
                          placeholder="YYYY-MM-DD"
                          onChange= { handleChange }
                      >                
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='reason'>
                      <Form.Control
                          as='textarea'
                          name='reason'
                          required
                          placeholder="Cause of Death...."
                          rows="3"
                          onChange= { handleChange }
                      >                
                      </Form.Control>
                    </Form.Group>
                    </>
                    : null
                }

                {state.status==="Hospitalized" || state.status==="A"?
                  <>
                    <Form.Group  controlId="ward">
                        <Form.Control
                                as='select'
                                name='ward'
                                onChange={handlebedChange}
                                required
                            >
                                <option>Select Ward</option>
                                <option>A</option>
                                <option>B</option>
                                <option>Obs & Gynae</option>
                                <option>Paediatric</option>
                              
                        </Form.Control>
                    </Form.Group>

                    <Form.Group  controlId="floor">
                        <Form.Control
                                as='select'
                                name='floor'
                                onChange={handlebedChange}
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
                            onChange={handlebedChange}
                            required
                            
                        />
                    </Form.Group>

                    <Form.Group  controlId="Name">
                        <Form.Control
                            as='select'
                            name='bed_category'
                            onChange={handlebedChange}
                            required
                        >
                            <option>Select Bed Category</option>
                            <option>General Bed</option>
                            <option>Oxygen Bed</option>
                            <option>ICU Bed</option>
                            <option>Ventilators</option>
                        </Form.Control>
                    </Form.Group>
                  </>: null
                }

                <Button variant="primary" type="submit" className="button my-2 p-2">
                  {loading ? 
                    <>
                    <span>Loading.....</span>
                    <Spinner animation="border" size="lg" className=""/>
                    </>: "Submit"
                  }
                </Button>
            </Form>
        </div>
    )
}
