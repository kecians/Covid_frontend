import React, { Component } from 'react'
import './Footer.scss'
// import { Link } from 'react-router-dom'
export class Footer extends Component {
    render() {
        return (
          <footer className="footer container-fluid p-0 m-0  ">
                  <div className="dropdown-divider"></div>                  
                    <p className=" text-center p-2">
                      Designed  &amp;  Developed by:&ensp; 
                      <a href="https://www.linkedin.com/in/ayush-bisht-9a5582192">Ayush&nbsp;Bisht&nbsp;|&nbsp; </a> 
                      <a href="https://prashantpandey.ml/">&nbsp;Prashant&nbsp;Pandey&nbsp;|&nbsp;</a>  
                      <a href="https://www.linkedin.com/in/shubham-tripathi-727424144">&nbsp;Shubham&nbsp;Tripathi&nbsp;</a>
                      
                    </p>
                    <div className="divider-p"></div>
                  
                 
                 
                    <p className=" text-center p-2">Bipin Treipathi Kumaon Institute of Technology, Almora</p>
                    <div className="divider-p"></div>
               

              
                    <p className=" text-center p-2">&copy;Copyright ©2021 All rights reserved</p>
                 
          </footer>
        )
    }
}

export default Footer
