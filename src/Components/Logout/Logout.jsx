import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { store } from "../../Redux/store";
import { logout, loading } from "../../Redux/actions.js/auth.actions";
import { Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import { CgLogOut } from 'react-icons/cg';
import { useHistory } from 'react-router-dom';
export function Logout(props) {
  
  const navigate = useHistory()

    return (
      
      <CgLogOut {...props} onClick={()=>{
          store.dispatch(loading());
          setTimeout(() => {
          store.dispatch(logout(navigate));
          }, 1000);          
          }} />
    )
}

Logout.propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logout, loading })(Logout);
