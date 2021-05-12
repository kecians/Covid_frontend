import React from 'react'

import Pprofile from '../../Components/Pprofile/Pprofile'
export default function Patientprofile(props) {
    return (
        <div className="container-fluid bg-silver pt-4">
            <Pprofile id = {props.match.params.id}/>
        </div>
    )
}
