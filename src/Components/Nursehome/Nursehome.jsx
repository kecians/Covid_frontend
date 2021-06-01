import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import { Button, Table } from 'react-bootstrap' 
// import ReactHTMLTableToExcel from 'react-html-table-to-excel';
// import Profile from '../Profile/Profile'
// import Infocard from '../Infocard/Infocard'
import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
import Heading from '../Heading/Heading'
import HeadingSmall from '../HeadingSmall/HeadingSmall'
import Profile from '../Profile/Profile'

export default function Nursehome() {
    const [state, setState] = useState({})
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
    const [status, setStatus] = useState({})

    useEffect(() => {
        axios({
            url: allotedBeds,
            method: 'GET',
            headers: {
              Authorization: `Token ${cookie.load('token')}`,
            },
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
        <div className="container pt-3">
            <Heading heading="Goverdhan Tiwari Government Base Hospital, Almora"/>
            <div className="row">
                <div className="col-md-12 col-12 col-sm-12 col-lg-12 p-0">
                    <Searchbar />
                </div>
                {/* <div className="col-md-3 col-3 col-sm-3"> 
                    <Logout />
                </div> */}
            </div>
            <hr className="mt-4"/>
            <div className="row" style={{marginLeft:"-22px"}}>
                <div className="col-md-12 col-sm-12 col-12 p-2 col-lg-12 p-0">
                    
                    <Link to='/home'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                            Home
                        </Button>
                    </Link>
                    <span className="p-1"></span>
                    <Link to='/list'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                                Hospitalized Patients 
                        </Button>
                    </Link>
                    
                    {cookie.load("staff")==="NURSE" ?
                    <>
                    <span className="p-1"></span>
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
            </div>
            
            <div className="row py-3">
                    <div className="col-md-3 col-sm-3 col-lg-3 col-12 mt-2 order-md-last  order-sm-last">
                        <Profile />
                    </div>
                    
                    <div className="col-md-9 col-sm-9 col-lg-9 col-12 mt-2 profile" style={{overflowX: "scroll"}}>
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
                </div>
            <div className="row">

            <div className="col-md-9 col-sm-9 col-lg-9 col-12 profile mt-2" style={{overflowX: "scroll"}}>
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
                                <td>{count || status.home_isolated? count+status.home_isolated: 0}</td>
                                <td>{count? count: 0}</td>
                                <td>{status.recovered? status.recovered: 0}</td>
                                <td>{status.migrated? status.migrated: 0}</td>                            
                                <td>{status.death? status.death: 0}</td>
                                <td>{status.home_isolated? status.home_isolated: 0}</td>
                                
                                
                            </tr>
                        
                            </tbody>
                        </Table>
                    </div>
            </div>

        </div>
    )

    
}