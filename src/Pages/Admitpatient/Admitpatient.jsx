import React from 'react'

import Heading from '../../Components/Heading/Heading'
import Addpatient from '../../Components/Addpatient/Addpatient'
export default function Admitpatient() {
    return (
        <div className="container-fluid bg-silver pt-4">
            <Heading heading="Patient Admit Form"/> 
            <div className="row">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6 col-12">
                    <Addpatient/>
                </div>
                
                <div className="col-md-3 col-lg-3"></div>
            </div>
            
        </div>
    )
}
