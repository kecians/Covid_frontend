import React, {useState} from 'react'
import { Button, Form, Table, Spinner } from 'react-bootstrap'
import {Link} from 'react-router-dom'
// import Logout from '../../Components/Logout/Logout'
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
            <div className="col-md-9 col-9 col-sm-12">
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
                {cookie.load("staff")!=="NURSE"? 
                    <div className="filter mt-4 row">
                    <Form onSubmit={handleSubmit} className=" mx-3  d-none d-md-block d-lg-block d-sm-block">
                        
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "migrated"});
                                
                            }}
                            >
                            Migrated
                        </Button>
                    </Form>
                    
                    <Form onSubmit={handleSubmit} className="mx-3  d-none d-md-block d-lg-block d-sm-block">
                        <Button 
                            variant="outline-primary" 
                            type="submit" 
                            className="searchbarcontainer" 
                            onClick={(e)=>{
                                setState({...state, query: "death"});
                                
                            }}
                            >
                            Death
                        </Button>
                    </Form>
                    <Form onSubmit={handleSubmit} className="mx-3  d-none d-md-block d-lg-block d-sm-block">
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
                </div>   
                : null
                }
            </div>
            {/* <div className="col-md-1 col-3 col-sm-12"> 
                <Logout />
            </div> */}
        </div>
         
        {state.show ? 
            <div className="row py-3">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
                    
                    <Table responsive="md" className="">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>

                        {/* {cookie.load("staff")==="NURSE" ?<th>Health Update</th>: null} */}
                        <th>Admitted On</th> 
                        <th>{state.query==="migrated"? "Migrated On":state.query==="death"? "Deceased On": "Recovered On"}</th> 
                        {state.query==="migrated"? 
                            <th>Migrated To</th>
                            :null
                        }
                        {state.query!=="recovered"? 
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
                        <td><Link to={`/patient/profile/${i.patient_id}`} className="text-primary text-center">{i.name}</Link></td>
                        
                        <td>{i.created_on? i.created_on.split("T")[0]: "N/A"}</td>
                        <td>{i.created_on? i.updated_on.split("T")[0]: "N/A"}</td>
                        {state.query==="migrated"? 
                            <td>{i.patient_migrate? i.patient_migrate.migrated_to: "N/A"}</td>
                            :null
                        }
                        {state.query==="migrated"? 
                            <td>{i.patient_migrate? i.patient_migrate.reason: "N/A"}</td>
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

