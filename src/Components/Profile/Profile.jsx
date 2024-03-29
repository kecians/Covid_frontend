import React from 'react'
import './Profile.css'
// import {Link} from 'react-router-dom'
// import { Button } from 'react-bootstrap'
import cookie from 'react-cookies' 


export default function StaffProfile(props) {
    return (
        <div className="card profile">
            <div className="card-body">
                <h5 className="card-title font-weight-bold">Info</h5>
                <p className="card-title">Staff Id: <span className="font-weight-bold">{cookie.load("username")} </span></p>
                <p className="card-title">Category: <span className="font-weight-bold">{cookie.load("staff")==="NURSE"?"DEO":cookie.load("staff")} </span></p>
                <br />
                {/* {cookie.load("staff")==="NURSE" ?
                    <>
                    <Link to="/patient/admit">
                        <Button variant="primary" type="submit" className="searchbarcontainer log">
                            Add Patient
                        </Button>
                    </Link>
                     </>
                     : 
                    null} */}
                
            </div>
        </div>
    )
}
