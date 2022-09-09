import React from 'react'
import './Heading.css'
export default function Heading(props) {
    return (
        <>
            <h1 className="heading">{props.heading}</h1>
            <div className="title-separator"></div>
        </>
    )
}
