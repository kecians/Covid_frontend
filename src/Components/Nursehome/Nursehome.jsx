import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import { Button, Table } from 'react-bootstrap' 
// import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
// import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
import Heading from '../Heading/Heading'
import Profile from '../Profile/Profile'

export default function Nursehome() {
    const [state, setState] = useState({})
    const [data, setData] = useState({})

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
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    // console.log(state, data)
    return (
        <div className="container pt-3">
            <Heading heading="Goberdhan Tiwari Government Base Hospital, Almora"/>
            <div className="row">
                <div className="col-md-12 col-12 col-sm-12">
                    <Searchbar />
                </div>
                {/* <div className="col-md-3 col-3 col-sm-3"> 
                    <Logout />
                </div> */}
            </div>
            <hr className="mt-4"/>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Patients" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Beds" data={state.total} />
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2 text-center">
                    <Link to='/list'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log" >
                           Active Patients 
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

            <div className="row py-3">
                    <div className="col-md-9 col-sm-9 col-lg-9 col-12 profile">
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

                    <div className="col-md-3 col-sm-3 col-lg-3 col-12  p-2">
                        <Profile />
                    </div>
                </div>

        </div>
    )

    
}