import React, { useEffect } from "react";
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
  HeartBeatTracker,
  TemperatureTracker,
  BloodPressureTracker,
} from "./PatientHealthCharts";
import { MdWaves } from "react-icons/md";
import { TbActivityHeartbeat } from "react-icons/tb";
import { MdBloodtype } from "react-icons/md";
import {GiHeartPlus} from 'react-icons/gi'

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
      <PatientConditionIndicator type={info.patient_condition} />
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
  const { data = {}, health_status = [] } = props;
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
              header={
                <>
                  <NativeText
                    sx={{
                      fontSize: theme.size.text.p2,
                    }}
                  >
                    Heart rate
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
                  70/120
                </NativeHeading>
              }
              chart={<HeartBeatTracker />}
            />
          </Grid>
          <Grid item xs={3}>
            <HealthCard
              sx={{
                width: "100%",
              }}
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
                  98 F
                </NativeHeading>
              }
              chart={<TemperatureTracker />}
            />
          </Grid>
          <Grid item xs={5}>
            <HealthCard
              sx={{
                width: "100%",
              }}
              header={
                <>
                  <NativeText
                    sx={{
                      fontSize: theme.size.text.p2,
                    }}
                  >
                    Blood pressure
                  </NativeText>
                  <TbActivityHeartbeat />
                </>
              }
              reading={
                <NativeHeading
                  sx={{
                    fontSize: theme.size.heading.h1,
                  }}
                >
                  70/120
                </NativeHeading>
              }
              chart={<BloodPressureTracker />}
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
                  Blood Pressure
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               >
                 120/70
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
                  Heart rate
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                 85 bmp
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
                  Glucose level
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                 85 bmp 
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
                  Blood cells
                </NativeText>
                 <NativeHeading
                 sx={{
                   fontSize: theme.size.heading.h2,
                   color : theme.palette.text.primary
                 }}
               > 
                 85 bmp
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
