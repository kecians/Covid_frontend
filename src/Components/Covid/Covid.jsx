import React from 'react';
import './Covid.scss'
import cosvg from './CovidAnimate.svg'
// import Animate5  from '../../Components/PetrolAnimations/animation5';
import Heading from '../Heading/Heading' 
import Login from '../Login/Login'

export default function Covid(){

    return (
        <>     
          <div className="container-fluid bg-silver pt-5">
              <div className="pt-4">
               <Heading heading='Covid 19 Data Hub'/>   
              </div>
             
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-none d-sm-block d-md-block">
                    <img src={cosvg} alt="" />
                </div>
                <div className="col-lg-1 col-md-1"></div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                    <Heading heading='Login'/>     
                <Login />
                </div>
                <div className="col-lg-1 col-md-1"></div>
              </div>
          </div>
        </>
    )
}