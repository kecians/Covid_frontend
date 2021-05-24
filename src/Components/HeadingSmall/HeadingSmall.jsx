import React from 'react'
export default function HeadingSmall(props) {
    return (
        <>
            <h3 className="heading">{props.heading}</h3>
            <div className="title-separator"></div>
        </>
    )
}
