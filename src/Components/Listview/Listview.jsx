import React from 'react'
import { Button } from 'react-bootstrap'
import './Listview.scss'
import Profile from '../Profile/Profile'
export default function Listview() {
    return (
        <div className="container pt-3">
            <div className="row">
                <div className="col-md-9 col-9 col-sm-12">
                    <form>
                        <div className='searchbarcontainer' >
                            <i className='fa fa-search serachicon'></i>
                            <input type="text" className='searchbar' placeholder='Search...'  />
                        </div>
                    </form>
                    <div className="filter mt-4 row">
                        {/* <i className='fa fa-filter serachicon col-3 col-md-1 col-sm-1'></i> */}
                        <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                            Bed1
                        </Button>
                        <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                            Bed1
                        </Button>
                        <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                            Bed1
                        </Button>
                    </div>
                </div>
                <div className="col-md-1 col-3 col-sm-12"> 
                    <Button variant="primary" type="submit" className="searchbarcontainer log">
                        Logout
                    </Button>
                </div>
            </div>
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
