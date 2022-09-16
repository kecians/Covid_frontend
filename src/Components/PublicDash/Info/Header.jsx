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

const DashboardHeader = () => {
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
        padding : "10px 20px"
         
      }}
    >
      <Box>
        <PrimaryHeading>Information</PrimaryHeading>
      </Box>
    
    </Box>
  );
};

export default DashboardHeader;
