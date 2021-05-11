import React from 'react'

import Heading from '../../Components/Heading/Heading'
import Register from '../../Components/Register/Register'
import cosvg from '../../Components/Covid/CovidAnimate.svg'
export default function Signup() {
    return (
        <>
         <div className="container-fluid bg-silver pt-5">
              <div className="pt-4">
               <Heading heading='Covid 19 Data Hub'/>   
              </div>
             
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-none d-sm-block d-md-block pt-5">
                    <img src={cosvg} alt="" />
                </div>
                <div className="col-lg-1 col-md-1"></div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <Heading heading='Signup'/>     
                <Register />
                </div>
                <div className="col-lg-1 col-md-1"></div>
              </div>
          </div>
        </>
    )
}
