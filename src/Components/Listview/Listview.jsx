import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Listview.scss'
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
import Searchbar from '../Searchbar/Searchbar'
import Logout from '../Logout/Logout'
import cookie from 'react-cookies'
import {patientAdmit} from '../../Api/patient.api'
import axios from 'axios'

export default function Listview() {
    const [state, setState] = useState([])
    useEffect(() => {
        axios({
            url: patientAdmit,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
          })
          .then((res) => {
            // localStorage.setItem('profileId', res.data.data.id);
            if (res.data.status === 404) {
              
            } else {
              setState(res.data.data)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    return (
        <div className="container pt-3">
            <div className="row">
                <div className="col-md-9 col-9 col-sm-12">
                    <Searchbar />
                </div>
                <div className="col-md-1 col-3 col-sm-12"> 
                    <Logout />
                </div>
            </div>
            <hr className="mt-4"/>
            {/* Cards for Status for patient check */}
            <div className="row check">
                <div className="col-md-4 col-sm-4 col-12 p-2 col-lg-4">
                    <Infocard name="Checked" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-12 p-2 col-lg-4">
                    <Infocard name="Not Checked" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2 text-center">
                    <Link to='/list'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log" >
                            All Patients 
                        </Button>
                    </Link>
                    <span className="p-1"></span>
                    <Link to='/home'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log " >
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
            {/* Cards for Status for patient check */}
            <div className="row py-3">
                <div className="col-md-9 col-sm-12 col-lg-9 col-12">
                    <div class="card profile">
                        <div class="card-body row">
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Patient ID</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Patient Name</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Health Update</h5>
                        </div>
                        {state.map((i,index) => (
                            <div class="card-body row" key={index}>
                                <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">{i.patient_id}</p>
                                <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center"><Link to={`/patient/profile/${i.patient_id}`} className="btn btn-light searchbarcontainer text-center ">{i.name}</Link></p>
                                <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">
                                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                                        <Link to={`/patient/healthcheck/${i.patient_id}/${i.name}`}>Health Checkup</Link>
                                    </Button>
                                </p>
                            </div>
                        ))}
                        
    
                    </div>
                </div>
                <div className="col-md-3 p-2  col-sm-12 col-lg-3 col-12">
                    <Profile name="Prashant" category="WardBoy"/>
                    
                </div>
            </div>
           
        </div>
    )
}
