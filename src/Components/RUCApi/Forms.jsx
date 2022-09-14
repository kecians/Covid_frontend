import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { NativeHeading, NativeText, PrimaryHeading, PrimaryText, SecondaryHeading, SecondaryText, SMText, XSMText } from "./Text";
import Box from '@mui/material/Box';
import { PieChart } from "./Charts/PieChart";
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useTheme } from "@mui/material";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Bedform from "../Bedform/Bedform";
import Statusform from '../../Components/Statusform/Statusform'
import Hform from "../Hform/Hform";
import { PrimaryButton } from "./Button";
import Input from '@mui/material/Input';

export const Form = styled( (props) => <Box component = "form"  {...props} /> )(( {theme}) => ({

  height: "auto",
  width: "auto",
  padding : "20px  10px",
  '& .MuiBackdrop-root ' : {
    "filter" : "blur(350px) !important",
    background: theme.palette.card.primary,
    opacity : "0.8 !important"
  },
  '& .MuiPaper-root ' : {
    padding : "20px",
    borderRadius : "20px",
    border : "1px solid" + theme.palette.border.primary,

  }
}));


export const NativeInput = styled( (props) => <TextField   {...props} />) (({theme}) => ({

    minHeight : theme.size.input.h,
    minWidth : theme.size.input.w,
    background : theme.palette.v2.primary,
    width : "200px",
    borderRadius : "20px",

    '& .MuiInputBase-input ': {
        fontSize : theme.size.input.fs,

     },
     '& legend ': {
        fontSize : "inherit",

     },

    '& label': {
        fontSize : theme.size.input.lfs,
        width : "120px"
     },
     '& .MuiInputBase-root ' : {
        borderRadius : "inherit"
     }

}))



export const NativeForm = (props) => {

    const{
        heading,
        fieldSet,
        submitBtn,
        children
    } = props

    return (
        <Form
            
        >
            <Stack spacing = {4}>
                <PrimaryHeading>
                    {heading}
                </PrimaryHeading>
                    {children}
            </Stack>
        </Form>
        )
    }