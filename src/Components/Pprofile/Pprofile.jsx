import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Table, Spinner } from 'react-bootstrap'
import Heading from '../Heading/Heading'
import { patientHealthProfile } from '../../Api/health.api'
import { patientProfile } from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
export default function Pprofile(props) {

    const [state, setState] = useState({})
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios({
            url: patientProfile+`${props.id}/`,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 404) {
                // setState(res.data.data)
            } else {
                setLoading(false)
                setState(res.data.data)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });

          
        axios({
        url: patientHealthProfile+`${props.id}/`,
        method: 'GET',
        headers: {
            Authorization: `Token ${cookie.load('token')}`,
        },
        })
        .then((res) => {
        if (res.data.status === 404) {
            setData(res.data.data)
        } else {
            setData(res.data.data)
        }
        })
        .catch((err) => {
        console.log(err.response);
        });
    }, [props.id])

    // console.log(data)
    return (
        <div className="container p-2">
            <Heading  heading="Patient Profile"/>
            <div className="row ">
                <div className="col-md-4 col-sm-12 col-lg-4 col-12 p-2">
                    <div class="card profile pt-4">
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Name: <span className="font-weight-bold">{state.name} </span></h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Status: <span className="font-weight-bold">{state.patient_status==="A"? "Active": state.patient_status==="R" ? "Recoverd" : state.patient_status==="M" ? "Migrated":null} </span></h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Patient id: <span className="font-weight-bold">{state.patient_id}</span></h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Contact Number: <span className="font-weight-bold">{state.contact_number}</span></h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-6 col-sm-6 col-6 col-lg-6  pl-5">Gender: <span className="font-weight-bold">{state.gender}</span></h6>
                            <h6 class=" col-md-6 col-sm-6 col-6 col-lg-6  pl-5">Age: <span className="font-weight-bold">{state.age}</span></h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Address: <span className="font-weight-bold">{state.address}</span></h6>
                        </div>
                        {cookie.load("staff")==="DOCTOR"? 
                            <div class="card-body row">
                            <div class=" col-md-4 col-sm-4 col-4 col-lg-4  pl-5">
                                <Link to={`/patient/bedchange/${state.patient_id}`}>
                                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                                        Change Bed
                                    </Button>
                                </Link>
                            </div>
                            <div class=" col-md-4 col-sm-4 col-4 col-lg-4  pl-5">
                                <Link to={`/patient/statuschange/${props.id}`}>
                                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                                        Change Status
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        : null
                        }
                        
                    </div>
                </div>
                <div className="col-md-8 col-sm-12 col-lg-8 col-12 p-2 profile">
                
                    <div class="pt-4">
                        <Heading  heading="Health Info"/>
                        <Table responsive="md" className="">
                        <thead>
                        <tr>
                            <th>Updated At (Date(Time))</th>
                            <th>Patient Condition</th>
                            <th>SPO2</th>
                            <th>Blood Pressure</th>
                            <th>Temperature (F)</th>
                            
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
                        {typeof(data)==="string"? data: 
                            <>
                            {data.map((i,index) => (
                        <tr>
                             <td>
                                {i.created_on? i.created_on.split("T")[0]: "N/A"}
                                ({i.created_on? i.created_on.split("T")[1].split(":")[0]: "N/A"}: {i.created_on? i.created_on.split("T")[1].split(":")[1]: "N/A"})
                             </td>
                            <td>{i.patient_condition==="1"? "Asymptomataic" : i.patient_condition==="2" ? "Mild" : i.patient_condition==="3" ? "Moderate" : "Severe" }</td>
                            <td>{i.oxy_level}%</td>
                            <td>{i.blood_pres_systolic}/{i.blood_pres_diastolic}(mm hg)</td>
                            <td>{i.temperature}(F)</td>
                           
                            
                            
                        </tr>
                        ))}
                            </>
                        }
                        </tbody>
                     </Table>
                    </div>


                    <div className="card-body row">
                        <div className=" col-md-3 col-sm-3 col-6 col-lg-3 text-center">
                            <Link to='/list'>
                                <Button variant="light" type="submit" className="searchbarcontainer">
                                   Active Patients
                                </Button>
                            </Link>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-6 col-lg-3 text-center"> 
                            <Link to='/home'>
                            <Button variant="primary" type="submit" className="searchbarcontainer log">
                                Home
                            </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
