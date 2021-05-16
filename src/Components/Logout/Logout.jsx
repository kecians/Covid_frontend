import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { store } from "../../Redux/store";
import { logout, loading } from "../../Redux/auth/auth.actions";
import { Button } from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
export function Logout(props) {
    if (!props.isAuthenticated) { 
        return <Redirect to='/' />;
      }
    return (
      
      <Button variant="primary" type="submit" className="searchbarcontainer log mt-2" onClick={()=>{
          store.dispatch(loading());
          setTimeout(() => {
          store.dispatch(logout());
          }, 1000);          
          }}>
          Logout
      </Button>
        
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
