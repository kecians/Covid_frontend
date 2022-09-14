import React from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../../RUCApi/Text";
import { PrimaryButton } from '../../../RUCApi/Button';
import { useTheme } from "@mui/material";
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
          <FaBackward  color=  {theme.palette.v2.secondary} size = "2rem" onClick = {() => closeProfile(false)}  />
        <PrimaryHeading> {info.name} </PrimaryHeading>
        
      </Stack>
  
     </Stack>
    );
}

export default ProfileHeader;
