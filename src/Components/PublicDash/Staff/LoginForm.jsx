import React, { useState } from "react";
import { NativeInput, NativeForm } from "../../RUCApi/Forms";
import { Box } from "@mui/material";
import { login, loading } from "../../../Redux/actions.js/auth.actions";
import cookie from "react-cookies";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { PrimaryButton } from "../../RUCApi/Button";
import { NativeCard } from "../../RUCApi/Cards";
import { useHistory } from "react-router-dom";

const StaffLoginForm = (props) => {
  const initialState = {
    username: "",
    password: "",
  };
  const navigate = useHistory()
  const [logindata, setLogindata] = useState(initialState);

  const handleChange = (event) => {
    setLogindata({
      ...logindata,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.loading();
    console.log("submit")
    if (!logindata) {
      console.log("Login---->");
    } else {
      console.log("Login---->");
      setTimeout(() => {
        props.login(logindata.username, logindata.password ) ;
      }, 1000);
    }
  };

  if (cookie.load("token")) { 
    return <Redirect to='/dashboard' />;
  }
  return (
    <Box
      height="100vh"
      width="100%"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <NativeCard>
        <NativeForm heading="Staff Login" >
          <NativeInput 
            placeholder="Username" 
            label="Username" 
            name="username"
            onChange={handleChange} 
            required
          />
          <NativeInput
            type="Password"
            placeholder="Password"
            label="Password"
            name="password"
            onChange={handleChange} 
            required
          />
          <PrimaryButton type="submit" onClick = {handleSubmit}>Submit</PrimaryButton>
        </NativeForm>
      </NativeCard>
    </Box>
  );
};

StaffLoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { login, loading })(StaffLoginForm);
