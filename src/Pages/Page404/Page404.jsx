import React from 'react'
import {Link} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Page404.css'

export default function Page404() {
    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404 container-fluid">
                    <div className="h1 text-primary">404</div>
                    <div className="h2 text-dark">Page not found</div>
                </div>
                    <Link to='/'> 
                        <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" >
                            Home Page
                        </Button>
                    </Link>
            </div>
        </div>
    )
}
