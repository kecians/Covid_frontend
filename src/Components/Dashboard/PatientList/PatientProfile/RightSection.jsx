import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { NativeCard } from '../../../RUCApi/Cards';
import { LineChart } from '../../../RUCApi/Charts/PieChart';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { PatientConditionIndicator } from "../../../RUCApi/PatientsUtils";
import {
    PrimaryText,
    SecondaryText,
    PrimaryHeading,
    SMText,
  } from "../../../RUCApi/Text";
import PatientHealthTable from './PatientHealthTable';


const O2LevelChart = ({data}) => {
    return (
        <LineChart   data = {[
            {
              "id": "japan",
              "color": "hsl(284, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 99
                },
                {
                  "x": "helicopter",
                  "y": 286
                },
                {
                  "x": "boat",
                  "y": 56
                },
                {
                  "x": "train",
                  "y": 3
                },
                {
                  "x": "subway",
                  "y": 300
                },
                {
                  "x": "bus",
                  "y": 208
                },
                {
                  "x": "car",
                  "y": 18
                },
                {
                  "x": "moto",
                  "y": 233
                },
                {
                  "x": "bicycle",
                  "y": 111
                },
                {
                  "x": "horse",
                  "y": 210
                },
                {
                  "x": "skateboard",
                  "y": 34
                },
                {
                  "x": "others",
                  "y": 242
                }
              ]
            },
            {
              "id": "france",
              "color": "hsl(328, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 209
                },
                {
                  "x": "helicopter",
                  "y": 292
                },
                {
                  "x": "boat",
                  "y": 243
                },
                {
                  "x": "train",
                  "y": 150
                },
                {
                  "x": "subway",
                  "y": 105
                },
                {
                  "x": "bus",
                  "y": 227
                },
                {
                  "x": "car",
                  "y": 18
                },
                {
                  "x": "moto",
                  "y": 103
                },
                {
                  "x": "bicycle",
                  "y": 28
                },
                {
                  "x": "horse",
                  "y": 11
                },
                {
                  "x": "skateboard",
                  "y": 291
                },
                {
                  "x": "others",
                  "y": 43
                }
              ]
            },
             
            
          ]} />
    )

}


const PatientTimeLine = (props) => {
    const steps = ['Covaxin dose 1', 'Covid positive', 'Covishield dose 2'];

    const isStepFailed = (step) => {
        return step === 1;
      };
    return (
        <Box sx={{ width: '100%' }} my = {3}>
        <Stepper activeStep={1}alternativeLabel >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>
    )
}

const HealthStatus = (props) => {

    const {
        info = {}
    } = props;

    useEffect(() => {
        console.log("info", info)
    }, [])
    return (
        
      <Box
      >
        <PatientConditionIndicator type={info.patient_condition} />
      <Box
        p={1}
        my={4}
        sx={{
          display: "inlineflex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
          height : "80px"
        }}
      >
        {info.patient_health_status &&
          Object.keys(info.patient_health_status).map((val) => (
            <Box align = "center">
              <SecondaryText>{val}</SecondaryText>
              <PrimaryHeading mt={1}>
                {info.patient_health_status[val]}
              </PrimaryHeading>
            </Box>
          ))}
      </Box>
      </Box>

      

      
    )
}


const RightSection = (props) => {

    const{
        data = {},
        health_status = []
    } = props;

    return (
        <Grid container spacing={3}
        >
        <Grid item xs={12}>
            <Grid container gap = {3} >
                <Grid item  xs={5}>
                    <NativeCard
                    >
                        <HealthStatus info = {data} />
                    </NativeCard>
                </Grid>
                <Grid item  xs={5}>

                </Grid>
            </Grid>
        </Grid>

        <Grid item xs={12}>
      
        </Grid>

        <Grid item xs={12}>
        <NativeCard  
            sx = {{
                height : "300px"
            }}
        >
            <O2LevelChart />

        </NativeCard>

        </Grid>
        <Grid item xs={12}>
            <PatientHealthTable rows = {health_status} />
        </Grid>

      </Grid>
    );
}

export default RightSection;
