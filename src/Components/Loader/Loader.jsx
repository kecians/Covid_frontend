// import dependencies

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import './Loader.scss'

const Load = ()=>{
    return(
        <div className='loader'>
            <svg version="1.1" id="loader" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
            <circle fill="#0074e1" stroke="none" cx="6" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite"
                begin="0.1"/>    
            </circle>
            <circle fill="#0074e1" stroke="none" cx="26" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite" 
                begin="0.2"/>       
            </circle>
            <circle fill="#0074e1" stroke="none" cx="46" cy="50" r="6">
                <animate
                attributeName="opacity"
                dur="1s"
                values="0;1;0"
                repeatCount="indefinite" 
                begin="0.3"/>     
            </circle>
            </svg>
        </div>
    )
}
export function Loader(props) {
    return (
        props.isLoading ? <Load />: null
    )
}

Loader.propTypes = {
    isLoading: PropTypes.bool,
  };
const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading
});
    
export default connect(mapStateToProps)(Loader);
