import React,{useState} from 'react'
import { Box, IconButton, Stack, useTheme } from '@mui/material'
import Addpatient from '../../Addpatient/Addpatient'
import {useToasts} from 'react-toast-notifications'
import { Form,  Col} from 'react-bootstrap'
import { patientAdmit } from '../../../Api/patient.api' 
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import cookie from 'react-cookies'
import { PrimaryButton } from '../../RUCApi/Button'
import { NativeHeading, NativeText, PrimaryHeading, PrimaryText, SecondaryHeading, SecondaryText, SMHeading, SMText } from '../../RUCApi/Text'
import { NativeCard } from '../../RUCApi/Cards'
import AdmitHeader from './Header'
import { GiNextButton, GiPreviousButton } from 'react-icons/gi'
import { TbArrowLeftBar } from 'react-icons/tb'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import AddPatientForm from './Form'



export default function AddPatient() {
    
    const info = {
        1: 'General',
        2: 'Patient Admission',
        3: 'Covid Test',
        4: 'Covid Vaccine'
    }
    const info2 = {
        "Paediatric": "P",
        "Obs & Gynae": "OG",
        "A": "A",
        "B": "B"
    }
    const [count, setCount] = useState(1)
    const theme = useTheme()

    
  return (
  <Box
    sx = {{
      
        width : "100%",
        height : "auto",
      
    }}
  >
<AdmitHeader>
    <NativeHeading
    sx = {{
        color : theme.palette.text.secondary,
        fontSize : theme.size.heading.h2

    }}
    >
    {info[count]} Details 
    </NativeHeading>
    <NativeText
    sx = {{
        color : theme.palette.text.primary,
        fontSize : theme.size.text.p1

    }}
    >
    Step {count} / 4
    </NativeText>
</AdmitHeader>
  <Box
  p = {3}
  sx = {{
    display : "flex",
    width : "100%",
    height : "auto",
    justifyContent : "center",
  }}
  >

  <NativeCard
    sx = {{
        width : "50%",
        padding : "20px",
    }}
>
    <AddPatientForm setValue = {setCount} />
     
  </NativeCard>

    </Box>


  </Box>
  )
}
