import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap' 
import { Link } from 'react-router-dom'
import { login, register, loading } from "../../Redux/actions.js/auth.actions";
import { Redirect } from 'react-router-dom'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useToasts } from 'react-toast-notifications'
import cookie from 'react-cookies'

export function Register(props) {

    const { addToast } = useToasts();
    const initialState = {
        username: '',
        password: '',
        password2: '',
        staff_categ: ''

    }

    const [registerdata, setRegisterdata] = useState(initialState);

    const handleChange = event => {
        setRegisterdata({
          ...registerdata,
          [event.target.name]: event.target.value
        });
      };
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        props.loading()
        if(!registerdata){
            console.log(registerdata)
            addToast("Please add proper data!", { appearance: 'info' }) 
          }
          else{
            setTimeout(() => {
            props.register(
              registerdata.username,
              registerdata.password,
              registerdata.password2,
              registerdata.staff_categ
            );
          }, 1000);
          }
    }
    if (cookie.load("token")) { 
      return <Redirect to='/home' />;
    }

    return (
        <>
        <Form className="loginform" onSubmit = { handleSubmit }>
            <Form.Group controlId="formBasicEmail">
                <Form.Control 
                    type="texxt" 
                    placeholder="Enter Userid" 
                    name="username"
                    required
                    onChange= { handleChange }
                />
                <Form.Text className="text-muted ml-4">
                    This should be your phone number or some unique id.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Control 
                    type="password" 
                    placeholder="Password" 
                    name="password"
                    required
                    onChange= { handleChange }
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword2">
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    name="password2"
                    required
                    onChange= { handleChange }
                />
            </Form.Group>
            <Form.Group controlId='staff_categ'>
                <Form.Control
                    as='select'
                    name='staff_categ'
                    required
                    onChange= { handleChange }
                >
                    <option>Select</option>
                    <option>Nurse</option>
                    <option>Doctor</option>
                    <option>Admin</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="button my-2 p-2">
                Submit
            </Button>
            <div className="text-center">or</div>
            <Link to="/">
                <Button variant="light" type="submit" className="searchbarcontainer button my-2 p-2">
                    Login
                </Button>
            </Link>
            
        </Form>
        </>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    token: PropTypes.string,
    isLoading: PropTypes.bool,
  };
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  isLoading: state.authReducer.isLoading,
});
    
export default connect(mapStateToProps, { login, register, loading })(Register);
