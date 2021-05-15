import React from 'react'

export default function Infocard(props) {
    return (
        <div className="card card-body profile text-center">
                <h5 className="card-title">{props.name}: {props.data}</h5>
        </div>
    )
}
