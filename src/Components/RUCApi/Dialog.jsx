import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { NativeHeading, NativeText, PrimaryHeading, PrimaryText, SecondaryHeading, SecondaryText, SMText, XSMText } from "./Text";
import { Box } from "@mui/system";
import { PieChart } from "./Charts/PieChart";
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import { useTheme } from '@mui/styles';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Bedform from "../Bedform/Bedform";
import Statusform from '../../Components/Statusform/Statusform'
import Hform from "../Hform/Hform";
import AddPatientForm from "../Dashboard/AddPatient/Form";

export const NativeDialog = styled(Dialog)(( {theme}) => ({

  height: "auto",
  width: "auto",
  '& .MuiBackdrop-root ' : {
    "filter" : "blur(350px) !important",
    background: theme.palette.v2.primary,
    opacity : "0.8 !important"
  },
  '& .MuiPaper-root ' : {
    padding : "20px",
    borderRadius : "20px",
    border : "1px solid" + theme.palette.border.primary,
    background : theme.palette.v2.light,

  }
}));


export const NativeDialogForms = (props) => {

    const theme = useTheme();
    const{
        head,
        body,
        foot,
        open = false,
        onClose = () => {}
    } = props

    const handleClick = (e) => {

        console.log(e.target.closest("#form-content-trigger"))
        if( !e.target.closest("#form-content-trigger")){
            onClose("");
        }
    }

    return(
        <NativeDialog
            open = {open}
            onClick = {handleClick}
        >
            <Stack
                id = {"form-content-trigger"}
                gap = {2}
                minWidth = "300px"
                width = "auto"
               
            >
                <Box>
                    {head}
                </Box>
                <Box>
                    {body}
                </Box>
                <Box>
                    {foot}
                </Box>

            </Stack>

        </NativeDialog>
    )

}

export const BedChangeDialogForm = (props) =>{

    const theme = useTheme();
    const{
        id,
        open = false, 
        setOpen = () => {}
    } = props;


    return (
        <NativeDialogForms 
            open = {open === "bed change" }
            onClose={ () => setOpen()} 
            
            head = { 
            <NativeHeading  sx = {{
                color : theme.palette.text.secondary,
                fontSize : theme.size.heading.h3

            }} 
            
            
            >
                Change Bed
            </NativeHeading>
                }
        body = {
            <Box
            sx = {{
                '& input, & select, & textarea' : {
                    minHeight : "40px",
                    borderRadius : "20px",
                    fontSize : theme.size.text.p2,
                    color : theme.palette.text.secondary + "!important",
                    background : theme.palette.v2.primary + "!important",
                borderColor : theme.palette.border.primary + "!important"

                }
            }}
            >
            <Bedform id={id} setUpdate = {setOpen} />

            </Box>
        }
        
        />
    )
}

export const StatusUpdateDialogForm = (props) =>{

    const theme = useTheme();

    const{
        id,
        open = false, 
        setOpen = () => {}
    } = props;


   
    return (
        <NativeDialogForms 
        open = {open === "status change" }
        onClose={ () => setOpen()} 

        head = { 
            <NativeHeading
            sx = {{
                color : theme.palette.text.secondary,
                fontSize : theme.size.heading.h3,
           
            }}
            >
                Update patient status
            </NativeHeading>
        }
        body = {

            <Box
            sx = {{
                '& input, & select, & textarea' : {
                    minHeight : "40px",
                    borderRadius : "20px",
                    fontSize : theme.size.text.p2,
                    color : theme.palette.text.secondary + "!important",
                    background : theme.palette.v2.primary + "!important",
                borderColor : theme.palette.border.primary + "!important"

               
                }
            }}
            >
                        <Statusform setUpdate = {setOpen} id={id}/>


            </Box>
        }
        
        />
    )
}


export const PatientInfoUpdateForm = (props) =>{

    const theme = useTheme();

    const{
        id,
        open = false, 
        setOpen = () => {},
        name
    } = props;


   
    return (
        <NativeDialogForms 
        open = {open }
        onClose={ () => setOpen()} 

        head = { 
            <NativeHeading
            sx = {{
                color : theme.palette.text.secondary,
                fontSize : theme.size.heading.h3,
                
            }}
            >
                Health Check 
            </NativeHeading>
        }
        body = {
            <Box
            sx = {{
                '& input, & select, & textarea' : {
                    minHeight : "40px",
                    borderRadius : "20px",
                    fontSize : theme.size.text.p2,
                    color : theme.palette.text.secondary + "!important",
                    background : theme.palette.v2.primary + "!important",
                borderColor : theme.palette.border.primary + "!important"

               
                }
            }}
            >

            <Hform setUpdate = {setOpen} id={id} name = {name} />
            </Box>

        }
        
        />
    )
}


export const PatientAdmitDialog = (props) =>{

    const theme = useTheme();

    const{
        id,
        open = false, 
        setOpen = () => {},
        name
    } = props;


   
    return (
        <NativeDialogForms 
        open = {open }
        onClose={ () => setOpen()} 
        height = {"auto"}
        head = { 
            <NativeHeading
            sx = {{
                color : theme.palette.text.secondary,
                fontSize : theme.size.heading.h3
            }}
            >
                Add Patient
            </NativeHeading>
        }
        body = {
            <AddPatientForm setUpdate = {setOpen} />
        }
        
        />
    )
}