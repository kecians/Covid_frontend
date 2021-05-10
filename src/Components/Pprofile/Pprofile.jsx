import React from 'react'

import { Button } from 'react-bootstrap'
import Heading from '../Heading/Heading'
export default function Pprofile() {
    return (
        <div className="container">
            <Heading  heading="Patient Profile"/>
            <div className="row py-3">
                <div className="col-md-6 col-sm-12 col-lg-6 col-12">
                    <div class="card profile pt-4">
                        <Heading  heading="General Info"/>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Name: </h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Patient id:</h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Adhar Number:</h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Contact Number:</h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Family Contact Number:</h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-6 col-sm-6 col-6 col-lg-6  pl-5">Gender:</h6>
                            <h6 class=" col-md-6 col-sm-6 col-6 col-lg-6  pl-5">Age:</h6>
                        </div>
                        <div class="card-body row">
                            <h6 class=" col-md-12 col-sm-12 col-12 col-lg-12  pl-5">Address:</h6>
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
                <div className="col-md-6 col-sm-12 col-lg-6 col-12">
                    <div class="card profile pt-4">
                        <Heading  heading="Health Info"/>
                        <div class="card-body row">
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">SPO2</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Blood Pressure</h5>
                            <h5 class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Temperature</h5>
                        </div>
                        <div class="card-body row">
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">SPO2</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">BPressure(mmhg)</p>
                            <p class=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">Temperature</p>
                        </div>
                    </div>


                    <div className="card-body row">
                        <div className=" col-md-4 col-sm-4 col-4 col-lg-4 text-center">
                            <Button variant="light" type="submit" className="searchbarcontainer">
                                Add Health
                            </Button>
                        </div>
                        <div className=" col-md-4 col-sm-4 col-4 col-lg-4 text-center"> 
                            
                            <Button variant="primary" type="submit" className="searchbarcontainer log">
                                Add Patient
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
