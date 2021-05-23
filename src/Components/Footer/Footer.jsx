import React, { Component } from 'react'
import './Footer.scss'
// import { Link } from 'react-router-dom'
export class Footer extends Component {
    render() {
        return (
          <footer className="footer container-fluid ">
                  <div className="dropdown-divider"></div>
                  <div className="row align-items-center justify-content-center ">
                    <h6 className="border-bottom">
                      Designed & Developed with <span className="fa fa-heart"></span> by:&nbsp;&nbsp;&nbsp;
                      <a href="https://www.linkedin.com/in/ayush-bisht-9a5582192">Ayush Bisht  | &nbsp; </a> 
                      <a href="https://prashantpandey.ml/">  Prashant Pandey | &nbsp;</a>  
                      <a href="https://www.linkedin.com/in/shubham-tripathi-727424144"> Shubham Tripathi</a>
                    </h6>
                    
                  </div>
                 
                  <div className="row align-items-center justify-content-center">
                    <h6 className="border-bottom">Guided by: &nbsp;&nbsp;&nbsp;<a href="/">Dr. Kunwar Singh Vaisla (H.O.D. CSE BTKIT ALMORA) &nbsp; </a></h6>
                     
                  </div>

                  <div className="row align-items-center justify-content-center p-1">
                    <h6>&copy;Copyright ©2021 All rights reserved</h6>
                  </div>
          </footer>
        )
    }
}

export default Footer
