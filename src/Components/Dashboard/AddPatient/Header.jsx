import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../RUCApi/Text";
import { useTheme } from '@mui/styles';
import cookie from 'react-cookies'

const AdmitHeader = ({children}) => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        minHeight : "100px",
        alignItems : "center",
        borderBottom :  "1px solid " + theme.palette.border.primary,
        padding : "10px 20px",
        zIndex : "3"

         
      }}
    >
      <Box>
       {children}
      </Box>
      <Box
        sx = {{
          display : "flex",
          alignItems : "center",
          justifyContent : "center",
          gap : "10px",
        zIndex : "2"

        }}
      >
        <img src= "https://happyhospital.in/wp-content/uploads/2016/08/single-doctor.jpg" width = "50px" height = "50px" style = {{ borderRadius : "100%", objectFit : "cover" }} />

        <SecondaryHeading>Ayush Bisht 
        <SMText component = "div" >{cookie.load("staff")}</SMText>
        </SecondaryHeading>
      </Box>
    </Box>
  );
};

export default AdmitHeader;
