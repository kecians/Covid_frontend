import React from 'react'
import { Button } from 'react-bootstrap'
import './Listview.scss'
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
import Searchbar from '../Searchbar/Searchbar'
export default function Listview() {
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
            <hr className="mt-4"/>
            {/* Cards for Status for patient check */}
            <div className="row check">
                <div className="col-md-4 col-sm-4 col-4 col-lg-4">
                    <Infocard name="Checked" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-4 col-lg-4">
                    <Infocard name="Not Checked" data="30"/>
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
                        <div class="card-body row">
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Patient ID</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Patient Name</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">
                                <Button variant="primary" type="submit" className="searchbarcontainer log">
                                    Health Checkup
                                </Button>
                            </p>
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
