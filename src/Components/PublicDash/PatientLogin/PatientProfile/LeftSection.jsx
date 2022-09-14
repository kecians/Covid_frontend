import { Paper, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import {
  PrimaryHeading,
  PrimaryText,
  SecondaryHeading,
  SecondaryText,
  SMText,
} from "../../../RUCApi/Text";
import { PrimaryButton } from "../../../RUCApi/Button";
import { IoMdBed } from "react-icons/io";
import { NativeCard, PatientInfoCard } from "../../../RUCApi/Cards";
import { darken } from "@mui/material/styles";
import { TbVaccine } from "react-icons/tb";
import { GiTestTubes } from "react-icons/gi";
import { useTheme } from "@mui/material";
import {FaRegEdit} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useState } from "react";
import { BedChangeDialogForm, StatusUpdateDialogForm } from "../../../RUCApi/Dialog";


const InfoCard = styled((props) => <Card {...props} />)(
  ({ theme }) => `
    background : ${theme.palette.v2.primary};
    border-radius : 12px;
    padding : 10px 15px;
    :hover {
    }
  `
);

const InfoPaper = styled(Paper)(
  ({ theme }) => `
    background : ${theme.palette.v2.light};
    border-radius : 12px;
    padding : 10px 15px;
    p{
        margin-top : 10px;    
    }
    :hover {
    }
  `
);

const PatientInfo = (props) => {

  const { info = false } = props;
  const [ update, setUpdate]  = useState("")
  const [selectedId, setID] = useState("")
  return (
    <PatientInfoCard
      heading={
        <PrimaryText
          sx = {{
            display : "inline-flex",
            justifyContent : "center",
            gap : "10px",
            alignItems : "center"
          }}
        >
          <IoMdBed />{info.bed_number}
        </PrimaryText>
      }
      info={ info && [
        {
          label: "Day of admission",
          value: info.admitted_on,
        },
        {
          label: <>{"Status"} 
          
          </>,
          value: <> {info.patient_status_display} </> ,
        },
        {
          label: "Patient ID",
          value: info.patient_id,
        },
        {
          label: "Sex",
          value: info.gender,
        },
        {
          label: "Age",
          value: info.age,
        },
      ]}
 
    />
  );
};

const VaccineInfo = (props) => {
  const { info = false } = props;

  return (
    <PatientInfoCard
      heading={
        <PrimaryText>
          <TbVaccine /> &nbsp; Vaccination
        </PrimaryText>
      }
      info={
        info &&
        info.is_vaccinated &&
        info.vaccine_status.map((val) => ({
          label: val.type,
          value: val.vaccinated_on,
        }))
      }
    />
  );
};

const CovidTest = (props) => {
  const { info = false } = props;

  return (
    <PatientInfoCard
    heading={
      <PrimaryText>
        <GiTestTubes /> &nbsp; Covid test
      </PrimaryText>
    }
    info={  info &&
      [
        
          {
              label : "Test type",
              value : info.type
          },
          {
              label : "Tested on",
              value : info.created_on
          },
          {
              label : "Tested result",
              value : info.result
          }
      ]
    }
  />
  );
};

const Diagnosis = (props) => {
  const { info = false } = props;

  return (
            <PatientInfoCard
    heading={
      <PrimaryText>
        <GiTestTubes /> &nbsp; Diagnosis
      </PrimaryText>
    }
    info={ info &&
      [
        
          {
              label : "Respiratory problem",
              value : "Mild"
          },
          {
              label : "Diabetes",
              value : 'Level 3'
          },
          {
              label : "typhoid",
              value : "Level 1"
          }
      ]
    }
  />
     
  );
};

const LeftSection = (props) => {
  const { data } = props;
  return (
      <Stack p={2} spacing={3}>
        <PatientInfo info={data} />
        <VaccineInfo info={data.patient_vaccine_status} />
        <CovidTest info={data.patient_covid_test} />
        <Diagnosis />
      </Stack>
  );
};

export default LeftSection;
