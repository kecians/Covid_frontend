import React, {useState} from 'react'
import { Button, Form, Table, Spinner } from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import Logout from '../../Components/Logout/Logout'
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {patientSearch} from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
export default function Searchbar() {

    const initialState = {
        show: false,
        loading: false,
        query: '',
        data: []
    }
    const [state, setState] = useState(initialState)

    const handleChange = event =>{
        setState({ ...state, [event.target.name]: event.target.value,         
        });
      }
    const handleSubmit = event => {
        event.preventDefault();
        setState({...state, loading: true})
        axios({
            url: patientSearch+`${state.query}/`,
            method: 'GET',
            headers: {
                Authorization: `Token ${cookie.load('token')}`,
        },
        })
        .then((res) => {
        if (res.data.status === 404) {
            setState({...state, show: true, loading: false, data: "Data Not Found!!"})
        } else {
            setState({...state, show: true, data: res.data.data.reverse()})
        }
        })
        .catch((err) => {
            setState({...state, show: true, loading: false, data: "Data Not Found!!"})
        });
        setState({...state, loading: false})

    }
    return (
        <>
        <div className="row">
            <div className="col-md-9 col-12 col-sm-12">
                <Form onSubmit={handleSubmit} id="form4"> {/*onSubmit={handleSubmit}*/}
                        <Form.Group controlId="Patientid" className='searchbarcontainer'>
                        <i className='fa fa-search serachicon'></i>
                        <input  
                            className='searchbar' 
                            type="text"
                            placeholder='Search...' 
                            name="query" 
                            onChange={handleChange}
                        />
                        </Form.Group>
                    <Button 
                        variant="light" type="submit" 
                        className="searchbarcontainer col-5 col-md-3 col-sm-3  mt-2">
                        Search
                    </Button>
                    
                </Form>
                
                    <div className="filter mt-4 row" style={{marginLeft: "-6px"}}>
                    <Form onSubmit={handleSubmit} className=" p-1">
                        
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "migrated"});
                                
                            }}
                            >
                            Referred
                        </Button>
                    </Form>
                    
                    <Form onSubmit={handleSubmit} className="p-1">
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "death"});
                                
                            }}
                            >
                            Deceased
                        </Button>
                    </Form> 
                    <Form onSubmit={handleSubmit} className="p-1">
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "recovered"});
                                
                            }}
                            >
                            Recovered
                        </Button>
                    </Form>
                    <Form onSubmit={handleSubmit} className="p-1">
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "home_isolated"});
                                
                            }}
                            >
                            Home Isolated
                        </Button>
                    </Form>
                </div>   
            </div>
            {/* <div className="col-md-1 col-3 col-sm-12"> 
                <Logout />
            </div> */}
        </div>
         
        {state.show ? 
            <div className="row p-3">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
                    <Table responsive="md" className="" id="searchtable">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>
                        {state.query==="home_isolated"? 
                            <th>Health Update</th>
                            :null
                        }
                        
                        <th>Admitted On</th> 
                        <th>{state.query==="migrated"? "Migrated On":state.query==="death"? "Deceased On": state.query==="death"? "Recovered On": "Last Updated on"}</th> 
                        {state.query==="migrated"? 
                            <th>Migrated To</th>
                            :null
                        }
                        {state.query!=="recovered" && state.query!=="home_isolated"? 
                            <th>Reason</th>
                            :null
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {state.loading ? 
                        <tr>
                            <td>
                                <span>Loading.....</span>
                                <Spinner animation="border" size="lg" className=""/>
                            
                            </td>
                        </tr>
                        :
                    null
                    }
                    {typeof(state.data)==="string"? 
                    "Patients Doesn't Exist!!"
                    :
                    <>
                        {state.data.map((i,index) => (
                    <tr>
                        <td>{i.patient_id}</td>
                        <td><Link to={`/patient/profile/${i.patient_id}/${i.contact_number}`}className="text-primary text-center">{i.name}</Link></td>
                        {state.query==="home_isolated"?      
                            <td> <Link to={`/patient/healthcheck/${i.patient_id}/${i.name}`} className="text-primary text-center">Health Checkup</Link></td>
                                    :null
                        }
                        <td>{i.admitted_on}</td>
                        <td>{state.query!=="death"? i.updated_on? i.updated_on.split("T")[0]: "N/A" : i.patient_death? i.patient_death.expired_on: "N/A"}</td>

                        {state.query==="migrated"? 
                            <td>{i.patient_migrate? i.patient_migrate.migrated_to: "N/A"}</td>
                            :null
                        }
                        {state.query!=="recovered" && state.query!=="home_isolated"? 
                            <td>{state.query==="death"? 
                            i.patient_death? i.patient_death.reason: "N/A": i.patient_migrate? i.patient_migrate.reason: "N/A" }</td>
                            :null
                        }
                    </tr>
                    ))}
                    </>
                    }
                    </tbody>
                </Table>
                </div>    
            </div>

        : null
        }
        </>
    )
}

