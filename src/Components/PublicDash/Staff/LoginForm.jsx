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
import StaffLoginSvg from '../../../assets/images/coolbg.svg'
import { CgPassword, CgProfile } from "react-icons/cg";
import CoolBg from "../../RUCApi/CoolBg";

const StaffLoginForm = (props) => {
  const initialState = {
    username: "xyzdoctor",
    password: "123",
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
    } else {
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
        overflow : "hidden"
      }}
    >
     
      <NativeCard
        sx = {{
          position : "relative",
          right : "5%"
        }}
      >
        <NativeForm heading="Staff Login" >
          <NativeInput 
            placeholder="Username" 
            label="Username" 
            name="username"
            value = {logindata.username}
            onChange={handleChange} 
            icon = { <CgProfile />}
            required
          />
          <NativeInput
            type="Password"
            placeholder="Password"
            label="Password"
            name="password"
            onChange={handleChange} 
            value = {logindata.password}
            icon = { <CgPassword />}
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
