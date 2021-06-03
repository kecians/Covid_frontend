import React from 'react'

import Pprofile from '../../Components/Pprofile/Pprofile'
export default function Patientprofile(props) {
    return (
        <div className="container-fluid bg-silver">
            <Pprofile id = {props.match.params.id} contact = {props.match.params.contact} />
        </div>
    )
}
