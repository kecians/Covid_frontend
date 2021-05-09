import React from 'react';
import './Covid.scss'
import cosvg from './CovidAnimate.svg'
// import Animate5  from '../../Components/PetrolAnimations/animation5';
import Heading from '../../Components/Heading/Heading' 


export default function Covid(){

    return (
        <>     
          <div className="container-fluid bg-silver">
            <Heading heading='Covid 19 Data Hub'/>     
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12 d-none d-sm-block d-md-block">
                    <img src={cosvg} alt="" />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                   
                </div>
            </div>
        </div>
        </>
    )
}