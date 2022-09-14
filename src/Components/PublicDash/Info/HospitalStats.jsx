import React from 'react';
import Container from '@mui/material/Container';
import DashboardHeader from './Header';
import ShiftStatus from './ShiftStatus';

const HospitalInfo = () => {
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
            </Container>

      </Container>
    );
}

export default HospitalInfo;
