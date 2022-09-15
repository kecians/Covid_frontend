import React, { useEffect, useMemo } from "react";
import Grid from "@mui/material/Grid";
import { HealthCard, NativeCard } from "../../../RUCApi/Cards";
import { LineChart } from "../../../RUCApi/Charts/PieChart";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { PatientConditionIndicator } from "../../../RUCApi/PatientsUtils";
import {
  PrimaryText,
  SecondaryText,
  PrimaryHeading,
  SMText,
  NativeText,
  NativeHeading,
} from "../../../RUCApi/Text";
import PatientHealthTable from "./PatientHealthTable";
import { ResponsiveLine } from "@nivo/line";
import { generateDrinkStats } from "@nivo/generators";
import { Line } from "@nivo/line";
import TemperatureChart from "./TemperatureTimeScaleChart.jsx";
import { BsHeart } from "react-icons/bs";
import { useTheme } from "@mui/material";
import {
  O2LevelTracker,
  TemperatureTracker,
  BloodPressureTracker,
} from "./PatientHealthCharts";
import { MdWaves } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import {GiHeartPlus} from 'react-icons/gi'
import {RiHeartPulseLine} from 'react-icons/ri';
import { FaLungs } from "react-icons/fa";

const PatientTimeLine = (props) => {
  const steps = ["Covaxin dose 1", "Covid positive", "Covishield dose 2"];

  const isStepFailed = (step) => {
    return step === 1;
  };
  return (
    <Box sx={{ width: "100%" }} my={3}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};



const HealthStatus = (props) => {

  const { info = {} } = props;

  useEffect(() => {
    console.log("info", info);
  }, []);



  return (
    <Box>
      <PatientConditionIndicator type={info.patient_condition_display} />
      <Box
        p={1}
        my={4}
        sx={{
          display: "inlineflex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
          height: "80px",
        }}
      >
        {info.patient_health_status &&
          Object.keys(info.patient_health_status).map((val) => (
            <Box align="center">
              <SecondaryText>{val}</SecondaryText>
              <PrimaryHeading mt={1}>
                {info.patient_health_status[val]}
              </PrimaryHeading>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

const RightSection = (props) => {
  const { data = {}, health_status = [], reading  = false} = props;


  
  const getReadings = useMemo(() => {

    if( reading ){

      const data = {
        
        "oxy" :  reading["oxy"] && reading["oxy"].length && Array.isArray(reading["oxy"]) && reading["oxy"].map((coords) => ({
         ...coords,
          x  : new Date(coords.x),
        })),
        "temperature" :   reading["temperature"] && reading["temperature"].length && Array.isArray(reading["temperature"]) && reading["temperature"].map((coords) => ({
         ...coords,
          x  : new Date(coords.x),
        })),
        "pulse" :   reading["pulse"] && reading["pulse"].length && Array.isArray(reading["pulse"]) && reading["pulse"].map((coords) => ({
          ...coords,
           x  : new Date(coords.x),
         })),
         "respiratory" :   reading["respiratory"] && reading["respiratory"].length && Array.isArray(reading["respiratory"]) && reading["respiratory"].map((coords) => ({
          ...coords,
           x  : new Date(coords.x),
         })),

      
    }

      return data;

    }
    return {}

  }, [reading])

  console.log("reading", getReadings)

  const getBPReading = useMemo(() => {
    
    if( reading && reading.bp){
      const data = [
        {
          id : "systolic",
          data :  reading.bp.systolic && Array.isArray(reading.bp.systolic) && reading.bp.systolic.map((coords) => ({
            ...coords,
             x  : new Date(coords.x),
           })),
        },
        {
          id : "diastolic",
          data : reading.bp.diastolic && Array.isArray(reading.bp.diastolic) && reading.bp.diastolic.map((coords) => ({
            ...coords,
             x  : new Date(coords.x),
           })),
        }
      ]
      return data
    }

    return [];
  }, [reading])

  useEffect(() => {
    console.log("reading", getReadings, getBPReading)

  }, [])

  const theme = useTheme();
  return (
    <Grid container gap={3} px = {3} >
      <Grid item xs={12}>
        <Grid container gap={3}>
          <Grid item xs={3}>
            <HealthCard
              fill={true}
              sx={{
                width: "100%",
              }}
              loading = { !(getReadings && getReadings.oxy && getReadings.oxy.length) }
              header={
                <>
                  <NativeText
                    sx={{
                      fontSize: theme.size.text.p2,
                    }}
                  >
                    O2 Level
                  </NativeText>
                  <BsHeart />
                </>
              }
              reading={
                <NativeHeading
                  sx={{
                    fontSize: theme.size.heading.h1,
                  }}
                >
                  {data.patient_health_status && data.patient_health_status.OL}
                </NativeHeading>
              }
              chart={<O2LevelTracker data = {getReadings.oxy} />}
            />
          </Grid>
          <Grid item xs={3}>
            <HealthCard
              sx={{
                width: "100%",
              }}
              loading = { !(getReadings && getReadings.temperature && getReadings.temperature.length) }

              header={
                <>
                  <NativeText
                    sx={{
                      fontSize: theme.size.text.p2,
                    }}
                  >
                    Fever
                  </NativeText>
                  <BsHeart />
                </>
              }
              reading={
                <NativeHeading
                  sx={{
                    fontSize: theme.size.heading.h1,
                  }}
                >
                              {data.patient_health_status && data.patient_health_status.T} F
                </NativeHeading>
              }
              chart={<TemperatureTracker data = {getReadings.temperature} />}
            />
          </Grid>
          <Grid item xs={5}>
            <HealthCard
              sx={{
                width: "100%",
              }}
              loading = { !( reading && getBPReading && getBPReading.length && getBPReading[1].data && getBPReading[0].data  ) }

              header={
                <>
                  <NativeText
                    sx={{
                      fontSize: theme.size.text.p2,
                    }}
                  >
                      Blood Pressure
                  </NativeText>
                  <TbActivityHeartbeat  />
                </>
              }
              reading={
                <NativeHeading
                  sx={{
                    fontSize: theme.size.heading.h1,
                  }}
                >
                    {data.patient_health_status && data.patient_health_status.BP}

                </NativeHeading>
              }
              chart={<BloodPressureTracker data = {getBPReading} />}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={11}></Grid>

      <Grid item xs={12}>
        <Grid container gap = {3} >
          <Grid item xs={2.5}>
            <HealthCard
              sx={{
                width: "100%",
              }}
              header={
                <>
                  <GiHeartPlus/>

                </>
              }
              reading={
                <>
                <NativeText
                  sx={{
                    fontSize: theme.size.text.p2,
                  }}
                >
                  Blood Pressure
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               >
                      {data.patient_health_status && data.patient_health_status.BP}

               </NativeHeading>
               </>

              }
            />
          </Grid>
          <Grid item xs={2.5}>
            {" "}
            <HealthCard
              sx={{
                width: "100%",
              }}
              header={
                <>
                  <RiHeartPulseLine/>
                </>
                
              }
              reading={
                <>
                <NativeText
                  sx={{
                    fontSize: theme.size.text.p2,
                  }}
                >
                  Pulse rate
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                    {data.patient_health_status && data.patient_health_status.PR} bpm
                 {}
               </NativeHeading>
               </>

              }
            />
          </Grid>
          <Grid item xs={2.5}>
            {" "}
            <HealthCard
              sx={{
                width: "100%",
              }}
              header={
                <>
                  <FaLungs/>
                </>
              }
              reading={
                <>
                <NativeText
                  sx={{
                    fontSize: theme.size.text.p2,
                  }}
                >
                  Respiratory rate
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                    {data.patient_health_status && data.patient_health_status.RR} bpm
                 
               </NativeHeading>
               </>

              }
            />
          </Grid>
          <Grid item xs={2.5}>
          <HealthCard
              sx={{
                width: "100%",
              }}
              header={
                <>
                  <MdBloodtype/>

                </>
                
              }
              reading={
                <>
                <NativeText
                  sx={{
                    fontSize: theme.size.text.p2,
                  }}
                >
                  Blood cells
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                 9,456 ml
               </NativeHeading>
               </>

              }
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PatientHealthTable rows={health_status} patient_info = {data} />
      </Grid>

      <div></div>
    </Grid>
  );
};

export default RightSection;
