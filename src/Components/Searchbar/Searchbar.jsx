import React from 'react'

import { Button } from 'react-bootstrap'
export default function Searchbar() {
    return (
        <>
         <form>
            <div className='searchbarcontainer' >
                <i className='fa fa-search serachicon'></i>
                <input type="text" className='searchbar' placeholder='Search...'  />
            </div>
        </form>
        <div className="filter mt-4 row">
            {/* <i className='fa fa-filter serachicon col-3 col-md-1 col-sm-1'></i> */}
            <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                Bed1
            </Button>
            <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                Bed1
            </Button>
            <Button variant="light" type="submit" className="searchbarcontainer col-3 col-md-3 col-sm-3 mx-2">
                Bed1
            </Button>
        </div>   
        </>
    )
}

