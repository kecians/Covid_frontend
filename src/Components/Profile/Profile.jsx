import React from 'react'
import './Profile.scss'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import cookie from 'react-cookies' 
export default function Profile(props) {
    return (
        <div class="card profile">
            <div class="card-body">
                <h5 class="card-title">Info</h5>
                <p class="card-title">Staff Id: <span className="font-weight-bold">{cookie.load("staff_id")} </span></p>
                <p class="card-title">Category: <span className="font-weight-bold">{cookie.load("staff")} </span></p>
                <br />
                <Link to="/patient/admit">
                <Button variant="primary" type="submit" className="searchbarcontainer log">
                    Add Patient
                </Button>
                </Link>
            </div>
        </div>
    )
}
