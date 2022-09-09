import React from 'react';
import Container from '@mui/material/Container';
import DashboardHeader from './Info/Header';
import PatientStatus from './Info/PatientStatus';
import ShiftStatus from './Info/ShiftStatus';

const RightSection = () => {
    return (
        <Container  
            maxWidth = "100%"
            sx = {{
                height : "auto",
            }}
        >
            <DashboardHeader />
            <ShiftStatus />
            <PatientStatus />
      </Container>
    );
}

export default RightSection;
