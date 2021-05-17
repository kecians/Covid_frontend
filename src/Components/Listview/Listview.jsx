import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button, Table, Spinner } from 'react-bootstrap'
import './Listview.scss'
import Profile from '../Profile/Profile'
import Searchbar from '../Searchbar/Searchbar'
import Logout from '../Logout/Logout'
import cookie from 'react-cookies'
import {patientAdmit} from '../../Api/patient.api'
import axios from 'axios'
import Heading from '../Heading/Heading'

export default function Listview() {
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState([])
    useEffect(() => {
        setLoading(true)
        axios({
            url: patientAdmit,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 404) {
                setLoading(false)
                setState(res.data.data)
            } else {
                setLoading(false)
                setState(res.data.data)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    // console.log(state)
    return (
        
        <div className="container pt-3">
            <Heading heading="Goberdhan Tiwari Government Base Hospital, Almora"/>
            <div className="row">
                <div className="col-md-12 col-12 col-sm-12">
                    <Searchbar />
                </div>
            </div>
            <hr className="mt-4"/>
            {/* Cards for Status for patient check */}
            <div className="col-md-12 col-sm-12 col-12 p-2 col-lg-12">
                    
                    <Link to='/home'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                            Home
                        </Button>
                    </Link>
                    <span className="p-1"></span>
                    <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                        <Link to='/list'> 
                            Active Patients 
                        </Link>
                    </Button>
                    <span className="p-1"></span>
                    {cookie.load("staff")==="NURSE" ?
                    <>
                    <Link to="/patient/admit">
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2">
                            Add Patient
                        </Button>
                    </Link>
                     </>
                     : 
                    null}
                    <span className="p-1"></span>
                    <Logout />
                </div>
            {/* Cards for Status for patient check */}
            <div className="row py-3">
                <div className="col-md-10 col-sm-12 col-lg-10 col-12 profile">
                
                <Table responsive="md" className="">
                    <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>Patient Name</th>

                        {cookie.load("staff")==="NURSE" ?<th>Health Update</th>: null}
                        <th>Patients Condition</th>
                        <th>Alloted Bed</th>
                        <th>Admitted On</th> 
                    </tr>
                    </thead>
                    <tbody>
                    {loading ? 
                        <tr>
                            <td>
                                <span>Loading.....</span>
                                <Spinner animation="border" size="lg" className=""/>
                            
                            </td>
                        </tr>
                        :
                    null
                    }
                    {typeof(state)==="string"? 
                    "Patients Doesn't Exist!!"
                    :
                    <>
                        {state.map((i,index) => (
                    <tr>
                        <td>{i.patient_id}</td>
                        <td><Link to={`/patient/profile/${i.patient_id}`} className="text-primary text-center">{i.name}</Link></td>
                        {cookie.load("staff")==="NURSE"?      
                            <td> <Link to={`/patient/healthcheck/${i.patient_id}/${i.name}`} className="text-primary text-center">Health Checkup</Link></td>
                                    :null
                        }
                        <td>{i.health_condition==="1"? "Asymptomataic": i.health_condition==="2"? "Mild": i.health_condition==="3"? "Moderate": "Severe"}</td>
                        <td>{i.patient_bed?i.patient_bed.bed_number: null}
                        (
                                {i.patient_bed ? 
                                    i.patient_bed.bed_category==="1"? "General Bed": i.patient_bed.bed_category==="2"?
                                            "O2 Bed": i.patient_bed.bed_category==="3"? "ICU": "Vantilator":null

                                })
                        </td>
                        <td>{i.created_on? i.created_on.split("T")[0]: "N/A"}</td>
                        
                    </tr>
                    ))}
                    </>
                    }
                    </tbody>
                </Table>
                </div>
                <div className="col-md-2 p-2  col-sm-12 col-lg-2 col-12">
                    <Profile/>
                    
                </div>
            </div>
           
        </div>
    )
}
