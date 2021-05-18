import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap' 
import Infocard from '../../Components/Infocard/Infocard'
// import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
// import cookie from 'react-cookies'
import Heading from '../../Components/Heading/Heading'

export default function Publicpage() {
    const [state, setState] = useState({})
    const [data, setData] = useState({})
    const [count, setCount] = useState(0)
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
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
    }, [])
    // console.log(state, data)
    return (
        <div className="container-fluid pt-3 bg-silver">
            <Heading heading="Goberdhan Tiwari Government Base Hospital, Almora"/>
            
            <hr className="mt-4"/>
            <div className="container">
            <div className="row">
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Patients" data={count} />
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Beds" data={state.total} />
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2 text-center">
                    
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
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 profile">
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
            </div>
        </div>
    )

    
}