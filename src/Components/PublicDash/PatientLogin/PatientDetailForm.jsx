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
import { useEffect } from "react";

const PatientDetailsForm = (props) => {
  const initialState = {
    id: "",
    contact: "",
  };
  const {
    setForm
  } = props
  const navigate = useHistory()
  const [logindata, setLogindata] = useState(initialState);

  const handleChange = (event) => {
    setLogindata({
      ...logindata,
      [event.target.name]: event.target.value,
    });
  };
 
  const handleSubmit = (event) => {
    setForm(logindata)
  };

 
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
        <NativeForm heading="Check Patient Details" >
          <NativeInput 
            placeholder="Username" 
            label="Username" 
            name="id"
            onChange={handleChange} 
            required
          />
          <NativeInput
            type="Password"
            placeholder="Password"
            label="Password"
            name="contact"
            onChange={handleChange} 
            required
          />
          <PrimaryButton type="submit" onClick = {handleSubmit}>Submit</PrimaryButton>
        </NativeForm>
      </NativeCard>
    </Box>
  );
};

PatientDetailsForm.propTypes = {
  login: PropTypes.func.isRequired,
  token: PropTypes.string,
  isLoading: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  token: state.authReducer.token,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { login, loading })(PatientDetailsForm);
