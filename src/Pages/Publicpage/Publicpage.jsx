import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap' 
// import Infocard from '../../Components/Infocard/Infocard'
// import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
// import cookie from 'react-cookies'
import Heading from '../../Components/Heading/Heading'
import HeadingSmall from '../../Components/HeadingSmall/HeadingSmall'
import Footer from '../../Components/Footer/Footer'
export default function Publicpage() {
    const [state, setState] = useState({})
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState({})
    useEffect(() => {
        axios({
            url: allotedBeds,
            method: 'GET',
           
          })
          .then((res) => {
            if (res.data.status === 404) {
              
            } else {
              setState(res.data.total_beds)
              setData(res.data.alloted_beds)
              setCount(res.data.data.length)
              setStatus(res.data.patient_status)
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    // console.log(state, data)
    return (
        <>
        <div className="container-fluid pt-3 bg-silver">
            <Heading heading="Goberdhan Tiwari Government Base Hospital, Almora"/>
            
            <hr className="mt-4"/>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2" style={{marginLeft:"-16px"}}>
                        <span className="p-1"></span>
                        <Link to='/login'> 
                            <Button variant="primary" type="submit" className="searchbarcontainer log " >
                                Login
                            </Button>
                        </Link>
                        <Link to='/patient/profile'> 
                            <Button variant="primary" type="submit" className="searchbarcontainer log m-2" >
                                Patient Login
                            </Button>
                        </Link>
                    </div>
                    <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile ">
                        <HeadingSmall heading="Today's Bed Status"/>
                        <Table responsive="md" className="">
                            <thead>
                            <tr>
                                <th>Total Beds(Available/Total)</th>
                                <th>General Beds (Available/Total)</th>
                                <th>Oxygen Beds (Available/Total)</th>
                                <th>ICU Beds (Available/Total)</th>
                                <th>Ventilator Beds (Available/Total)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td><span className="text-primary">{state.total-data.total}</span>/{state.total}</td>
                                <td><span className="text-primary">{state.general-data.general }</span>/{state.general}</td>
                                <td><span className="text-primary">{state.oxygen-data.oxygen }</span>/{state.oxygen}</td>                            
                                <td><span className="text-primary">{state.icu-data.icu }</span>/{state.icu}</td>
                                <td><span className="text-primary">{state.ventillator-data.ventillator }</span>/{state.ventillator}</td>
                                
                            </tr>
                        
                            </tbody>
                        </Table>
                    </div>
                    <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile mt-2">
                        <HeadingSmall heading="Today's Patient Status"/>
                        <Table responsive="md" className="font-weight-bold" >
                            <thead>
                            <tr>
                                <th>Total Patients</th>
                                <th>Hospitalized</th>
                                <th>Recovered</th>
                                <th>Referred</th>
                                <th>Deceased </th>
                                <th>Home Isolated </th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{count || status.home_isolated? count+status.home_isolated: "N/A"}</td>
                                <td>{count? count: "N/A"}</td>
                                <td>{status.recovered? status.recovered: "N/A"}</td>
                                <td>{status.migrated? status.migrated: "N/A"}</td>                            
                                <td>{status.death? status.death: "N/A"}</td>
                                <td>{status.home_isolated? status.home_isolated: "N/A"}</td>
                                
                                
                                
                            </tr>
                        
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid p-0 m-0 pt-5 bg-silver">
                <Footer />  
            </div>
        </>
    )

    
}
