import React from 'react';
import Container from '@mui/material/Container';
import DashboardHeader from './Header';
import PatientStatus from './PatientStatus';
import ShiftStatus from './ShiftStatus';

const RightSection = () => {
    return (
        <Container  
            sx = {{
                height : "auto",
                padding : "0px !important",
                margin : "0px",
                overflow : "hidden",
                maxWidth : "100% !important",
                
            }}
        >
            <DashboardHeader />
            <Container
             
             >

            <ShiftStatus />
            <PatientStatus />
            </Container>

      </Container>
    );
}

export default RightSection;
