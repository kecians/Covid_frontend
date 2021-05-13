import React from 'react'
import Heading from '../../Components/Heading/Heading'
import Statusform from '../../Components/Statusform/Statusform'
export default function Healthform(props) {
    const id = props.match.params.id
    
    return (
        <div className="container-fluid bg-silver pt-4">
            <Heading heading="Patient Status Change Form"/>
            <div className="row">
                <div className="col-md-3 col-12 col-sm-12"></div>
                <div className="col-md-6 col-12 col-sm-12">
                    <Statusform id = {id} />
                </div>
            </div>
           
        </div>
    )
}
