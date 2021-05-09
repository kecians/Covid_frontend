// import dependencies 

import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import cookie from 'react-cookies'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import { store } from "../../Redux/store";
// import { HashLink } from 'react-router-hash-link';
// import styles

import './NavBar.scss'

//  import components

// import { logout, loading } from "../../Redux/auth/auth.actions";
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'




export default function NavBar() {
    

    return (
        <>
        {/* Main Navbar containing menu baar and login and logout */}

        <Navbar   expand="lg" sticky="top" className="navbar-parent">
        <Navbar.Brand href="/" className="text-light ">Frontline</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav "  >
        
            <Link to ="/login"className= "nav-link text-light  waves-effect waves-light right-nav  ">Login</Link>
            <Link to ="/register"className=  "nav-link text-light right-nav ">Signup</Link>
            
            
            <Nav className="mr-auto " >

            {/* {cookie.load("token")?
                <>
                
                <Link to ="/profile"  className= "nav-linktext-light  waves-effect waves-light p-0  pl-3  profile-logo ">
                    <i className="fas fa-user-circle fa-2x m-0 p-1"></i>
                </Link>
                <span className = "nav-link text-light  waves-effect waves-light right-nav">{cookie.load("username")}</span>
                <Link to ="/"  onClick={()=>{
                    store.dispatch(loading());
                    setTimeout(() => {
                      store.dispatch(logout());
                    }, 1000);           
                    }} className= "nav-link text-light  waves-effect waves-light right-nav  ">Logout</Link>
                </>
                :

               

            } */}

            
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        </>
    )
}


 

// NavBar.propTypes = {
//     logout: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool,
//   };

// const mapStateToProps = (state) => ({
//   isAuthenticated: state.authReducer.isAuthenticated,
// });

// export default connect(mapStateToProps, { logout, loading })(NavBar);
