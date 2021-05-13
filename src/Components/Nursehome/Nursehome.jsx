import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import { Button } from 'react-bootstrap' 
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
import cookie from 'react-cookies'
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

            <div className="row">
                <div className="col-md-9 col-9 col-sm-9">
                    <Searchbar />
                </div>
                <div className="col-md-3 col-3 col-sm-3"> 
                    <Logout />
                </div>
            </div>
            <hr className="mt-4"/>
            <div className="row check">
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Patient" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Beds" data={state.total} />
                </div>
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2 text-center">
                    <Link to='/list'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log" >
                            All Patients 
                        </Button>
                    </Link>
                    <span className="p-1"></span>
                    <Link to='/list'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log " >
                            Home
                        </Button>
                    </Link>
                </div>
                
            </div>

            <div className="row py-3">
                <div className="col-md-9 col-sm-12 col-lg-9 col-12 p-2">
                    <div className="card profile">
                        <div className="card-body row">
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">Normal Beds</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">Oxygen Beds</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">ICU Beds</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">Ventilator Beds</h6>
                        </div>
                        <div className="card-body row">
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.general}(Total)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.oxygen}(Total)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.icu}(Total)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.ventillator}(Total)</p>
                        </div>
                        <div className="card-body row">
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{data.general}(Occupied)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{data.oxygen}(Occupied)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{data.icu}(Occupied)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{data.ventillator}(Occupied)</p>
                        </div>
                        <div className="card-body row">
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.general-data.general }(Available)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.oxygen-data.oxygen }(Available)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.icu-data.icu }(Available)</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center">{state.ventillator-data.ventillator }(Available)</p>
                        </div>
    
                    </div>
                </div>
                <div className="col-md-3 col-sm-12 col-lg-3 col-12 p-2">
                    <Profile />
                </div>
            </div>

        </div>
    )

    
}