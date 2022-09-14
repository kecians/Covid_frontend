// import dependencies
import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
// import components
import { Form, Button} from 'react-bootstrap'
import './Login.css'
import cookie from 'react-cookies'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, loading } from "../../Redux/actions.js/auth.actions";
export function Login(props) {
    const initialState = {
        username: '',
        password: '',
    }
    const [logindata, setLogindata] = useState(initialState)

    const handleChange = (event)=>{
      setLogindata({
        ...logindata,
        [event.target.name]: event.target.value
      })
    }
    const handleSubmit = (event)=>{
      event.preventDefault();
      props.loading();
      if (!logindata){
          console.log("Login---->")
      }
      else{
        console.log("Login---->")
        setTimeout(() => {
            props.login(
              logindata.username,
              logindata.password,
            );
          }, 1000);
      }
      
    }
    if (cookie.load("token")) { 
      return <Redirect to='/home' />;
    }
    return (
        <>
        
            <Form className="loginform" onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Userid"
                        name="username"
                        onChange={handleChange} 
                        required
                        />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        name="password"
                        onChange={handleChange}
                        required
                        />
                </Form.Group>
                <Button variant="primary" type="submit" className="button my-2 p-2">
                    Submit
                </Button>
            </Form>
        </>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    token: PropTypes.string,
    isLoading: PropTypes.bool,
  };
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  isLoading: state.authReducer.isLoading,
});
    
export default connect(mapStateToProps, { login, loading })(Login);
