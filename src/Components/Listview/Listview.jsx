import React from 'react'
import {Redirect, Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Listview.scss'
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
import Searchbar from '../Searchbar/Searchbar'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { store } from "../../Redux/store";
import { logout, loading } from "../../Redux/auth/auth.actions";
import cookie from 'react-cookies'
export function Listview() {
    if (!cookie.load("token")) { 
        return <Redirect to='/' />;
      }
    return (
        <div className="container pt-3">
            <div className="row">
                <div className="col-md-9 col-9 col-sm-12">
                    <Searchbar />
                </div>
                <div className="col-md-1 col-3 col-sm-12"> 
                    <Button variant="primary" type="submit" className="searchbarcontainer log" onClick={()=>{
                        store.dispatch(loading());
                        setTimeout(() => {
                        store.dispatch(logout());
                        }, 1000);           
                        }}>
                        Logout
                    </Button>
                </div>
            </div>
            <hr className="mt-4"/>
            {/* Cards for Status for patient check */}
            <div className="row check">
                <div className="col-md-4 col-sm-4 col-6 col-lg-4">
                    <Infocard name="Checked" data="30"/>
                </div>
                <div className="col-md-4 col-sm-4 col-6 col-lg-4">
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
                                    <Link to="/nurse/patient/healthcheck">Health Checkup</Link>
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

Listview.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logout, loading })(Listview);
