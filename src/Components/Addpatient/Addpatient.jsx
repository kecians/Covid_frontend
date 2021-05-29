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
        patient_condition: '',
        bed_number: '',
        bed_category: '',
        ward: '',
        floor: '',
        remark: '',
        is_tested: '',
        type: '',
        result: '',
        is_vaccinated: '',
        patient_status: '',
        redirect: false,

    }
    const info = {
        1: 'General',
        2: 'Patient Admission',
        3: 'Covid Test',
        4: 'Covid Vaccine'
    }
    const vac = {
       "Covishield": "1",
       "Covaxin": "2"
    }
    const vaccineState = {
        type: '',
        vaccinated_on: '',
    }

    const [vaccine, setVaccine] = useState(vaccineState)
    const [state, setState] = useState(initialState)
    const [count, setCount] = useState(1)
    const [show, setShow] = useState(false)

    const handleVaccineChange = e =>{
        const { name, value } = e.target;
        setVaccine({
        ...vaccine,
        [name]: name==="type"? vac[value]: value,
        });
    }
    const [vaccine_status, setVaccine_status] = useState([])

    const handleVaccineSave = e =>{
        e.preventDefault();
        setVaccine_status([...vaccine_status, vaccine])
    }
    const handleRemoveItem = idx => {
        const temp = [...vaccine_status];
        temp.splice(idx, 1);
        setVaccine_status(temp);
    }
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
        if (state.patient_condition==="Asymptomatic"){
            state.patient_condition=1
        }
        else if (state.patient_condition==="Mild"){
            state.patient_condition=2
        }
        else if (state.patient_condition==="Moderate"){
            state.patient_condition=3
        }
        else if (state.patient_condition==="Severe"){
            state.patient_condition=4   
        }
        else{
            state.patient_condition=""
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
        else if(state.bed_category==="Ventilators"){
            state.bed_category="4"
        }
        else{
            state.bed_category=""
        }
        //

        //  For is_tested
        if(state.is_tested==="Yes"){
            state.is_tested = true
        }
        else{
            state.is_tested = false
        }
        
        // For Vaccine Status
        if(state.is_vaccinated==="Yes"){
            state.is_vaccinated = true
        }
        else{
            state.is_vaccinated = false
        }

        // For Covid test type
        if(state.type==="Rapid Antigen"){
            state.type = '1'
        }
        else if(state.type==="RT-PCR"){
            state.type = '2'
        }
        else if(state.type==="TrueNat"){
            state.type = '3'
        }
        
        // For Covid test status 
        if (state.result==="Positive"){
            state.result='1'
        }
        else if (state.result==="Negative"){
            state.result='2'
        }
        else if (state.result==="Awaited"){
            state.result='3'
        }
        else if (state.result==="Rejected") {
            state.result='4'
        }

        //  For Patient Status

        if (state.patient_status==="Home Isolation"){
            state.patient_status='H'
        }
        else if(state.patient_status==="Hospitalization"){
            state.patient_status='A'
        }
        else{
            addToast("Please add a valid choice for patient admission category !", { appearance: 'error' });
        }
        event.preventDefault();
        const eData={
            name: state.name,
            contact_number: state.contact_number,
            gender: state.gender,
            age: state.age,
            address: state.address,
            health_condition: state.patient_condition,
            covid_status: state.covid_status,
            remark: state.remark,
            patient_status: state.patient_status,
            patient_bed: state.patient_status==="H"? {}: {
                bed_number: state.bed_number,
                bed_category: state.bed_category,
                ward: state.ward,
                floor: state.floor
            },
            patient_covid_test: 
                {
                    is_tested: state.is_tested, 
                    type: state.type,
                    result: state.result
                }
            ,
            patient_vaccine_status: {
                is_vaccinated: state.is_vaccinated,
                vaccine_status: vaccine_status
            }
            
        }
        if (typeof state.contact_number !== "undefined") {

            var pattern = new RegExp(/^[0-9\b]+$/);
          
            if (!pattern.test(state.contact_number)) {
                return addToast("Please enter valid phone number!", { appearance: 'error' });
          
            }else if(state.contact_number.length < 10){
                return addToast("Phone number must be atleast 10 digit long!", { appearance: 'error' });
            }
        
        }
        if (typeof state.age !== "undefined") {
            if (!pattern.test(state.age)) {
                return addToast("Please enter valid age!", { appearance: 'error' });
            }
          
        }
        if(state.patient_condition === ""){
            return addToast("Please enter valid choice for patient condition!", { appearance: 'error' });
        }
        
        if (state.patient_status!=="H"){
            if(state.ward === ""){
                return addToast("Please enter valid choice for ward category!", { appearance: 'error' });
            }
            if(state.floor === ""){
                return addToast("Please enter valid choice for floor category!", { appearance: 'error' });
            }
            
            if(state.bed_category === ""){
                return addToast("Please enter valid choice for bed category!", { appearance: 'error' });
            }
            if (typeof state.bed_number !== "undefined" || state.bed_number === "") {
                if (!pattern.test(state.bed_number)) {
                    return addToast("Please enter valid bed number!", { appearance: 'error' });
                }
              
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
        <>

        <div className="bg-primary text-light p-4 my-4" style={{borderRadius: "30px"}}>
            <h4><span className="font-weight-bold ">{info[count]} Details</span></h4> <h5><span className="">Step {count} / 4</span> </h5>  
        </div>


        <Form className="loginform" onSubmit={handleSubmit}>
            
            {/* For Step 1 */}
            {count===1? <>
            
                <Form.Group  controlId="Name">
                    <Form.Control 
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        onChange={handleChange}
                        value={state.name}
                        required/>
                </Form.Group>


                <Form.Group controlId='contact_number'>
                        <Form.Control
                            type='text'				                        
                            placeholder='Contact Number'                             
                            name='contact_number'
                            onChange={handleChange}
                            value={state.contact_number}
                            required
                            
                        />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="Name">
                    <Form.Control
                            as='select'
                            name='gender'
                            onChange={handleChange}
                            value = {state.gender}
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
                            value={state.age}
                            required
                            
                        />
                    </Form.Group>

                </Form.Row>
                <Form.Group controlId='patient_condition'>
                        <Form.Control
                            as='select'
                            name='patient_condition'
                            required
                            value = {state.patient_condition}
                            onChange= { handleChange }
                        >
                            <option>Select Patient Condition</option>
                            <option>Asymptomatic</option>
                            <option>Mild</option>
                            <option>Moderate</option>
                            <option>Severe</option>
                        </Form.Control>
                </Form.Group>
                
                <Form.Group controlId="address" >
                    <Form.Control 
                        as="textarea"  
                        rows="6" 
                        name="address" 
                        placeholder="Address" 
                        onChange={handleChange}
                        value={state.address}
                        required
                        />
                </Form.Group>
                <Form.Group controlId="remark" >
                    <Form.Control 
                        as="textarea"  
                        rows="6" 
                        name="remark" 
                        placeholder="Remark" 
                        onChange={handleChange}
                        value={state.remark}
                        required
                        />
                </Form.Group>
                </>
                : 
                null
            }
            {/* For Step 1 */}

            {/* For Step 2 */}
            {count===2? 
                <>
                    <Form.Group  controlId="patient_status">
                        <Form.Control
                                as='select'
                                name='patient_status'
                                onChange={handleChange}
                                value={state.patient_status}
                                required
                            >
                                <option>Select Patient Admission Category</option>
                                <option>Hospitalization</option>
                                <option>Home Isolation</option>
                        </Form.Control>
                    </Form.Group>

                    {state.patient_status==="Hospitalization"? 

                        <>
                            <Form.Group  controlId="ward">
                        <Form.Control
                                as='select'
                                name='ward'
                                onChange={handleChange}
                                value = {state.ward}
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
                                value = {state.floor}
                                required
                            >
                                <option>Select Floor</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group  controlId="category">
                        <Form.Control
                                as='select'
                                name='bed_category'
                                onChange={handleChange}
                                value = {state.bed_category}
                                required
                            >
                                <option>Select Bed Category</option>
                                <option>General Bed</option>
                                <option>Oxygen Bed</option>
                                <option>ICU Bed</option>
                                <option>Ventilators</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='bed_number'>
                        <Form.Control
                            type='text'				                        
                            placeholder='Bed Number'                             
                            name='bed_number'
                            onChange={handleChange}
                            value={state.bed_number}
                            required
                            
                        />
                    </Form.Group>
                        </>
                    :
                    null
                    }

                    
                    
                
                </>
                : 
                null
            }
            {/* For Step 2 */}

            {/* For Step 3 */}
            {count===3? 
                <>
                    <Form.Group  controlId="test">
                        <Form.Control
                                as='select'
                                name='is_tested'
                                onChange={handleChange}
                                value={state.is_tested}
                                required
                            >
                                <option>Select Test Status</option>
                                <option>Yes</option>
                                <option>No</option>
                        </Form.Control>
                    </Form.Group>
                    {state.is_tested==="Yes"? 
                        <>
                            <Form.Group  controlId="test-type">
                                <Form.Control
                                        as='select'
                                        name='type'
                                        onChange={handleChange}
                                        value={state.type}
                                        required
                                    >
                                        <option>Select Test</option>
                                        <option>Rapid Antigen</option>
                                        <option>RT-PCR</option>
                                        <option>TrueNat</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  controlId="test-result">
                                <Form.Control
                                        as='select'
                                        name='result'
                                        onChange={handleChange}
                                        value={state.result}
                                        required
                                    >
                                        <option>Select Test Result</option>
                                        <option>Positive</option>
                                        <option>Negative</option>
                                        <option>Awaited</option>
                                        <option>Rejected</option>
                                </Form.Control>
                            </Form.Group>
                        </>
                        : 
                        null
                    }
                </>
                : 
                null
            }

            {/* For Step 3 */}

            {/* For Step 4 */}
            {count===4? 
                <>
                    <Form.Group  controlId="test">
                        <Form.Control
                                as='select'
                                name='is_vaccinated'
                                onChange={handleChange}
                                value={state.is_vaccinated}
                                required
                            >
                                <option>Select Vaccine Status</option>
                                <option>Yes</option>
                                <option>No</option>
                        </Form.Control>
                    </Form.Group> 
                    {vaccine_status.length ? 

                        vaccine_status.map((i,index)=>{
                            return(
                                <div key={index} id={`dose${index}`}>
                                    <div className="bg-primary text-light p-1 my-4" style={{borderRadius: "30px"}}>
                                        <h5 className="text-center"> <span className="font-weight-bold">{index+1}-Dose</span></h5>
                                    </div>
                                    <div className="bg-light text-light p-2 my-4" style={{borderRadius: "30px"}}>
                                        <div className="text-info"> 
                                            <div className="font-weight-bold p-1">Vaccine Type: {i.type==="1"? "Covishield": "Covaxin"}</div>
                                            <div className="font-weight-bold p-1">Vaccinated On: {i.vaccinated_on}</div>
                                            <Button className="fa fa-trash btn btn-primary searchbarcontainer log"
                                                onClick={()=>{
                                                    handleRemoveItem(index)
                                                }}
                                            >
                                            </Button>
                                        </div>
                                       
                                    </div>
                                </div>

                            )
                        })
                        : null
                    }
                    {state.is_vaccinated==="Yes" && show? 
                        <>
                            <Form.Group  controlId="test-vaccine">
                                <Form.Control
                                        as='select'
                                        name='type'
                                        onChange={handleVaccineChange}
                                        value = {vaccine.type}
                                        required
                                    >
                                        <option>Select Vaccine Type</option>
                                        <option>Covishield</option>
                                        <option>Covaxin</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group  controlId="vaccinated_on">
                                <Form.Control
                                       type="date"
                                        name='vaccinated_on'
                                        value = {vaccine.vaccinated_on}
                                        onChange={handleVaccineChange}
                                        placeholder= "YYYY-MM-DD"
                                        required
                                    />
                            </Form.Group>
                        </>
                        : 
                        null
                    }
                    {state.is_vaccinated==="Yes" && show ? 
                        <>
                            <div className="my-2">
                            <Button variant="outline-primary" 
                                onClick={handleVaccineSave}  
                                className="searchbarcontainer">
                                Save
                            </Button>
                            </div>
                        
                        </> 
                        : 
                        null
                    }
                    {state.is_vaccinated==="Yes"?
                            <div>
                                <i className={ show ? "fa  btn btn-primary searchbarcontainer log fa-check": " fa  btn btn-primary searchbarcontainer log fa-plus"}
                                onClick={()=>{
                                    show ? setShow(false): setShow(true)
                                }}
                            >   {show? " Submit": " Add Dose"}
                            </i>  
                            </div>
                              
                              :null
                    }

                </>
                : 
                null
            }
            {/* For Step 4 */}


            {count!==1? 
                <Button variant="info" 
                    onClick={()=>{
                        count>1? setCount(count-1): setCount(count)
                        }} 
                    className="  buttonpre my-2 p-2"
                >
                    Previous
                </Button>: null
            }
            
            {count!==4? 
                <Button variant="primary" 
                    onClick={()=>{
                        count<4? setCount(count+1): setCount(count)
                        
                        }}  className="buttonnext my-2 p-2">
                    Next
                </Button>: null
            }
             {count===4? 
                 <Button variant="primary" type="submit" className="buttonnext my-2 p-2">
                    Submit
                </Button>
             : null
            }
        </Form>
        </>
    )
}
