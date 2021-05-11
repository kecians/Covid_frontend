import React from 'react'

export default function Infocard(props) {
    return (
        <div class="card card-body profile text-center">
                <h5 class="card-title">{props.name}: {props.data}</h5>
        </div>
    )
}
