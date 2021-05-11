//  import dependencies

import React, { useEffect } from 'react'
import { useToasts } from 'react-toast-notifications'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const errorList = {
    404: 'error',
    201: 'success',
    200: 'info'
}
export function Toastify(props) {
    const { addToast } = useToasts()
    useEffect(() => {
        if(props.toast){
            addToast(props.toastMessage, { appearance: errorList[props.error] }) 
        }
    }, [props.toast, props.error, props.toastMessage, addToast])
    return (
        <></>
    )
}

Toastify.propTypes = {
    isLoading: PropTypes.bool,
  };
const mapStateToProps = (state) => ({
  toast: state.authReducer.toast,
  toastMessage: state.authReducer.toastMessage,
  error: state.authReducer.error
});
    
export default connect(mapStateToProps)(Toastify);
