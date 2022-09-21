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
import { useTheme } from '@mui/styles';
import {FaRegEdit} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useState } from "react";
import { BedChangeDialogForm, StatusUpdateDialogForm } from "../../../RUCApi/Dialog";
import { getDateTimeString } from "../../../../assets/scripts";
import cookie from "react-cookies"

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
          {
          info.bed_number !== "NA" && (
          <> 
            <IoMdBed /> {info.bed_number}
            {  cookie.load("token") && <FaRegEdit onClick={ () => setUpdate("bed change")} title = "change bed"  size = "12px" style = {{ cursor : "pointer"}}  />
      }
            </>
            )
          }
            </PrimaryText>
      }
      info={ info && [
        {
          label: "Day of admission",
          value: info.admitted_on,
        },
        {
          label: <>{"Status"} 
          {cookie.load("token") && <FaRegEdit onClick={ () => {setUpdate("status change") }} title = "update patient status" size = "10"  style = {{ cursor : "pointer", margin : "0px 5px"}} /> 
        }</>,
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
       ...( ( info.patient_status_display == "migrated" && info.patient_migrate ) ? [ 
            {
              label : "Migrated on",
              value : getDateTimeString(info.patient_migrate.migrated_on)
            }, {
              label : "Migrated to",
              value : info.patient_migrate.migrated_to
            }, {
              label : "Reason",
              value : info.patient_migrate.reason
            },
         ] : []),

         ...( (info.patient_status_display == "death" && info.patient_death) ? [ 
          {
            label : "Expired on",
            value : getDateTimeString(info.patient_death.expired_on)
          },  {
            label : "Reason",
            value : info.patient_death.reason

          },
        ] : [])

      ]}
      other = {
        cookie.load("token") &&(
        <>
        
          <BedChangeDialogForm id = {info.patient_id}  open = {update} setOpen = {setUpdate}  />
          <StatusUpdateDialogForm id = {info.patient_id} open = {update} setOpen = {setUpdate} />
        </>)

      }
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
          label: val.vaccine_type_display,
          value: getDateTimeString(val.vaccinated_on),
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
              value : info.test_type_display
          },
          {
              label : "Tested on",
              value : getDateTimeString(info.created_on)
          },
          {
              label : "Tested result",
              value : info.test_result_display
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
