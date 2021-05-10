import React from 'react'

import Searchbar from '../Searchbar/Searchbar'
import { Button } from 'react-bootstrap' 
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
export default function Nursehome() {
    return (
        <div className="container pt-3">

            <div className="row">
                <div className="col-md-9 col-9 col-sm-12">
                    <Searchbar />
                </div>
                <div className="col-md-1 col-3 col-sm-12"> 
                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                        Logout
                    </Button>
                </div>
            </div>

            <div className="row check">
                <div className="col-md-4 col-sm-4 col-4 col-lg-4">
                    <Infocard name="Total Patient" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-4 col-lg-4">
                    <Infocard name="Total Beds" data="30"/>
                </div>
            </div>

            <div className="row py-3">
                <div className="col-md-9 col-sm-12 col-lg-9 col-12">
                    <div class="card profile">
                        <div class="card-body row">
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Normal Beds</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Oxygen Beds</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Ventilator Beds</h5>
                        </div>
                        <div class="card-body row">
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Occupied)</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Occupied)</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Occupied)</p>
                        </div>
                        <div class="card-body row">
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Free)</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Free)</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">45(Free)</p>
                        </div>
    
                    </div>
                </div>
                <div className="col-md-3">
                    <Profile name="Prashant" category="WardBoy"/>
                </div>
            </div>

        </div>
    )
}
