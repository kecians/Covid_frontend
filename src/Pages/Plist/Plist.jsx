import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Listview from '../../Components/Listview/Listview'
// import Nav from '../../Components/NavBar/NavBar'
export default function Plist() {
    return (
        <>
        <div className=" container-fluid bg-silver p-0">
            <Listview />
        </div>
        <div className="container-fluid p-0 m-0">
            <Footer />  
        </div>
        </>
    )
}
