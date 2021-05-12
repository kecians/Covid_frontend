import React from 'react'

import Hform from '../../Components/Hform/Hform'
import Heading from '../../Components/Heading/Heading'
export default function Healthform(props) {
    // console.log(props)
    return (
        <div className="container-fluid bg-silver pt-4">
            <Heading heading="Health Check Form"/>
            <div className="row">
                <div className="col-md-3 col-12 col-sm-12"></div>
                <div className="col-md-6 col-12 col-sm-12">
                    <Hform props={props}/>
                </div>
            </div>
           
        </div>
    )
}
