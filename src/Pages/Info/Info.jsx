import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Nursehome from '../../Components/Nursehome/Nursehome'
export default function Info() {
    return (
        <>
        <div className="container-fluid bg-silver">
            <Nursehome />
        </div>
        <div className="container-fluid p-0 m-0">
            <Footer />  
        </div>
        </>
    )
}
