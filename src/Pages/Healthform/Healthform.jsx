import React from 'react'

import Hform from '../../Components/Hform/Hform'
import Heading from '../../Components/Heading/Heading'
export default function Healthform(props) {
    const id = props.match.params.id
    const name = props.match.params.name
    console.log(id, name)
    return (
        <div className="container-fluid bg-silver pt-4">
            <Heading heading="Health Check Form"/>
            <div className="row">
                <div className="col-md-3 col-12 col-sm-12"></div>
                <div className="col-md-6 col-12 col-sm-12">
                    <Hform id = {id} name={name}/>
                </div>
            </div>
           
        </div>
    )
}
