import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../RUCApi/Text";

const DashboardHeader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        minHeight : "100px",
        alignItems : "center"
      }}
    >
      <Box>
        <PrimaryHeading>Dashboard</PrimaryHeading>
      </Box>
      <Box
        sx = {{
          display : "flex",
          alignItems : "center",
          justifyContent : "center",
          gap : "10px"
        }}
      >
        <img src= "https://happyhospital.in/wp-content/uploads/2016/08/single-doctor.jpg" width = "50px" height = "50px" style = {{ borderRadius : "100%", objectFit : "cover" }} />

        <SecondaryHeading>Ayush Bisht 
        <SMText component = "div" >Doctor</SMText>
        </SecondaryHeading>
      </Box>
    </Box>
  );
};

export default DashboardHeader;
