import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap' 
import Infocard from '../../Components/Infocard/Infocard'
// import Logout from '../Logout/Logout'
import {allotedBeds} from '../../Api/patient.api'
import axios from 'axios'
// import cookie from 'react-cookies'
import Heading from '../../Components/Heading/Heading'

export default function Publicpage() {
    const [state, setState] = useState({})
    const [data, setData] = useState({})

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
            
            <hr className="mt-4"/>
            <div className="row">
                <div className="col-md-4 col-sm-4 col-12 col-lg-4 p-2">
                    <Infocard name="Total Patients" data="30"/>
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
                </div>
                
            </div>

            <div className="row py-3">
                <div className="col-md-12 col-sm-12 col-lg-12 col-12 p-2">
                    <div className="card profile">
                        <div className="card-body row">
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">General Beds (Available/Total)</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">Oxygen Beds (Available/Total)</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">ICU Beds (Available/Total)</h6>
                            <h6 className=" col-md-3 col-sm-3 col-3 col-lg-3 font-weight-bold text-center">Ventilator Beds (Available/Total)</h6>
                        </div>
                        <div className="card-body row">
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center"><span className="text-primary">{String(state.general-data.general)}</span>/{state.general}</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center"><span className="text-primary">{String(state.oxygen-data.oxygen)}</span>/{state.oxygen}</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center"><span className="text-primary">{String(state.icu-data.icu)}</span>/{state.icu}</p>
                            <p className=" col-md-3 col-sm-3 col-3 col-lg-3 text-center"><span className="text-primary">{String(state.ventillator-data.ventillator)}</span>/{state.ventillator}</p>
                        </div>
                        {/* <div className="card-body row">
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
                        </div> */}
    
                    </div>
                </div>
                           </div>

        </div>
    )

    
}