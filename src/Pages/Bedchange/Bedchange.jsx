import React from 'react'
import Heading from '../../Components/Heading/Heading'
import Bedform from '../../Components/Bedform/Bedform'
export default function Bedchange(props) {
    const id = props.match.params.id
    return (
        <div className="container-fluid bg-silver pt-4">
            <Heading heading="Bed Change Form"/> 
            <div className="row">
                <div className="col-md-3 col-lg-3"></div>
                <div className="col-md-6 col-lg-6 col-12">
                    <Bedform id={id}/>
                </div>
                
                <div className="col-md-3 col-lg-3"></div>
            </div>
            
        </div>
    )
}
