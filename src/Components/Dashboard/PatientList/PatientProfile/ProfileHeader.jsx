import React from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../../RUCApi/Text";
import { PrimaryButton } from '../../../RUCApi/Button';
import { useTheme } from '@mui/styles';
import { FaBackward } from 'react-icons/fa';

const ProfileHeader = (props) => {

  const {
    closeProfile = () => {},
    info
  } = props;
  const theme = useTheme()
    return (
     <Stack
        direction="row"
        alignItems = "center"
        justifyContent = "space-between"
        w = "100%"
        h = {"150px"}
        py = {3}
        px = {3}
        sx = {{
          borderBottom :  "1px solid " + theme.palette.border.primary
        }}
     >
         <Stack 
            direction="row"
            gap = {2}
            alignItems = "center"
         >
          <FaBackward style = {{ zIndex : "1", cursor : "pointer"}} color=  {theme.palette.v2.secondary} size = "2rem" onClick = {() => closeProfile(false)}  />
        <PrimaryHeading> {info.name} </PrimaryHeading>
        
      </Stack>
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
     </Stack>
    );
}

export default ProfileHeader;
