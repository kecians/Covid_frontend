import styled from '@emotion/styled';
import { Box } from '@mui/system';
import React from 'react';
import PatientInfoCard from './PatientInfoCard';
import PatientStatus from './PatientStatus';

const PatientFlex = styled(Box)`
    
    display : flex;
    flex-direction : row;
    flex-wrap : wrap;
    height : auto;
    padding : 10px;
    gap : 24px;

`

const PatientList = (props) => {

    const{
      data = []
    } = props;


    return (
      <PatientFlex>

        { data && data.map((val, ind) => ( <PatientInfoCard info = {val} key = {val.patient_id} /> ) )}
        {data.length == 0 && [1,2,4,4,5,6].map(val => <PatientInfoCard key = {val} />) }
      </PatientFlex>
    );
}

export default PatientList;
