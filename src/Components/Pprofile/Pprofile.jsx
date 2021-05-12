import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Heading from '../Heading/Heading'
import { patientHealthProfile } from '../../Api/health.api'
import { patientProfile } from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
export default function Pprofile(props) {

    const [state, setState] = useState({})
    const [data, setData] = useState([])
    useEffect(() => {
        axios({
            url: patientProfile+`${props.id}/`,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            if (res.data.status === 404) {
              
            } else {
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
            
        } else {
            setData(res.data.data)
        }
        })
        .catch((err) => {
        console.log(err.response);
        });
    }, [props.id])
    return (
        <div className="container">
            <Heading  heading="Patient Profile"/>
            <div className="row ">
                <div className="col-md-3 col-sm-12 col-lg-3 col-12">
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
                        <div class="card-body row">
                            <div class=" col-md-4 col-sm-4 col-4 col-lg-4  pl-5">
                                <Button variant="primary" type="submit" className="searchbarcontainer log">
                                    Change Bed
                                </Button>
                            </div>
                            <div class=" col-md-4 col-sm-4 col-4 col-lg-4  pl-5">
                                <Button variant="primary" type="submit" className="searchbarcontainer log">
                                    Discharge
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-sm-12 col-lg-9 col-12 p-2">
                    <div class="card profile pt-4">
                        <Heading  heading="Health Info"/>
                        <div class="card-body row">
                            <h6 class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center font-weight-bold">Patient Condition</h6>
                            <h6 class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center font-weight-bold">SPO2</h6>
                            <h6 class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center font-weight-bold">Blood Pressure</h6>
                            <h6 class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center font-weight-bold">Temperature</h6>
                        </div>
                        {data.map((i,index) => (
                        <div class="card-body row" key={index}>
                            <p class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{i.patient_condition===1? "Asymptomataic" : i.patient_condition===2 ? "Mild" : i.patient_condition===3 ? "Moderate" : "Severe" }</p>
                            <h5 class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{i.oxy_level}</h5>
                            <p class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{i.blood_pres_systolic}/{i.blood_pres_diastolic}(mm hg)</p>
                            <p class=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{i.temperature}</p>
                        </div>
                        ))}
                    </div>


                    <div className="card-body row">
                        <div className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">
                            <Link to='/list'>
                                <Button variant="light" type="submit" className="searchbarcontainer">
                                    All Patients
                                </Button>
                            </Link>
                        </div>
                        <div className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center"> 
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
