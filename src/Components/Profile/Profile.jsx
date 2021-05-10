import React from 'react'
import './Profile.scss'
export default function Profile(props) {
    return (
        <div class="card profile">
            <div class="card-body">
                <h5 class="card-title">Info</h5>
                <p class="card-title">Name: {props.name}</p>
                <p class="card-title">Category: {props.category}</p>
            </div>
        </div>
    )
}
