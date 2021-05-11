import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import Searchbar from '../Searchbar/Searchbar'
import { Button } from 'react-bootstrap' 
import Profile from '../Profile/Profile'
import Infocard from '../Infocard/Infocard'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { store } from "../../Redux/store";
import { logout, loading } from "../../Redux/auth/auth.actions";
import cookie from 'react-cookies'
export function Nursehome() {
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
                    <Button variant="primary" type="submit" className="searchbarcontainer mt-3 log" >
                       <Link to='/list'> All Patients </Link>
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

Nursehome.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logout, loading })(Nursehome);
