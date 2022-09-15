import React, {useState} from 'react';
import PatientProfile from '../../Dashboard/PatientList/PatientProfile'
import PatientDetailsForm from  './PatientDetailForm.jsx'

const PatientLogin = () => {
    const [ query_params, setQuery] = useState(false)
    return (
        ! query_params
        ? <PatientDetailsForm setForm = {setQuery}  />
        : <PatientProfile  query_params = { query_params} closeProfile = {setQuery} />
     );
}

export default PatientLogin;
