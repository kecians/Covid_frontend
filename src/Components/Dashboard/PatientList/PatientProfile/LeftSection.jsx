import { Paper, Stack } from '@mui/material';
import Card from "@mui/material/Card";
import React from 'react';
import { styled } from '@mui/material/styles';
import CardContent from '@mui/material/CardContent';
import { PrimaryHeading, PrimaryText, SecondaryHeading, SecondaryText, SMText } from "../../../RUCApi/Text";
import { PrimaryButton } from '../../../RUCApi/Button';
import { IoMdBed } from "react-icons/io";
import {NativeCard} from "../../../RUCApi/Cards"
import { darken } from '@mui/material/styles';

const InfoCard = styled( (props) => <Card  {...props} />)(
    ({ theme }) => `
    background : ${theme.palette.v2.primary};
    border-radius : 12px;
    padding : 10px 15px;
    :hover {
    }
  `,
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
  `,
  );



const PatientInfo = (props) => {
    const{
        info
    } = props;

    return(
        <InfoCard 
         
        >
            <PrimaryText >
            <IoMdBed/> &nbsp; {info.bed_number}
            </PrimaryText>
            <SecondaryText>
                Day of admission <SMText>{info.admitted_on}</SMText>
            </SecondaryText>
            <SecondaryText>
            Status: <SMText>{info.patient_statu}</SMText>
            </SecondaryText>
            <br/>
            <SecondaryText>
            Patient id:  <SMText>{info.patient_id}</SMText>
            </SecondaryText>
            <SecondaryText>
            Sex: <SMText>{info.gender}</SMText>
            </SecondaryText>
            <SecondaryText>
            Age: <SMText>{info.age}</SMText>
            </SecondaryText>
      </InfoCard>
    )

}


const VaccineInfo = (props) => {

    const{
        info
    } = props;

    return(
        <InfoCard 
        >
            <PrimaryText >
            Covid vaccination
            </PrimaryText>
            {
                info && info.is_vaccinated && info.vaccine_status.map((val ) => (
                    <SecondaryText>
                    <SMText>{val.vaccinated_on}</SMText> {val.type}
                    </SecondaryText>
                ))

            }
         
            
      </InfoCard>
    )
}

const CovidTest = (props) => {
    const{
        info = {}
    } = props;

    return(
        <InfoCard 
        >
            <PrimaryText >
            Covid test
            </PrimaryText>
            <br/>

            <SecondaryText>
                Tested on <SMText>{info.created_on}</SMText>
            </SecondaryText>
            <SecondaryText>
            Test type: <SMText>{info.type}</SMText>
            </SecondaryText>
            <SecondaryText>
            Result:  <SMText>{info.result}</SMText>
            </SecondaryText>
          
         
            
      </InfoCard>
    )

}

const Diagnosis = (props) => {
    const{
        info = {}
    } = props;

    return(
        <InfoCard 
        >
            <PrimaryText >
            Diagnosis
            </PrimaryText>
            <br/>

            <SecondaryText>
                Respiratory problem
            </SecondaryText>
            <SecondaryText>
            diabetes
            </SecondaryText>
            <SecondaryText>
                Typhoid
            </SecondaryText>
          
         
            
      </InfoCard>
    )

}


const LeftSection = (props) => {
    const {
        data
    } = props
    return (
       <InfoPaper>
            <Stack
                p = {2}
                spacing = {4}
            >
                <PatientInfo  info = {data}/>
                <VaccineInfo  info = {data.patient_vaccine_status}/>
                <CovidTest info = {data.patient_covid_test} />
                <Diagnosis />
            </Stack>
       </InfoPaper>
    );
}

export default LeftSection;
