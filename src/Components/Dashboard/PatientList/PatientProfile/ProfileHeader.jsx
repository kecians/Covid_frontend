import React from 'react';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { PrimaryHeading, SecondaryHeading, SMText } from "../../../RUCApi/Text";
import { PrimaryButton } from '../../../RUCApi/Button';

const ProfileHeader = () => {
    return (
     <Stack
        direction="row"
        alignItems = "center"
        justifyContent = "space-between"
        w = "100%"
        h = {"150px"}
        py = {3}
     >
         <Stack 
            direction="column"
            gap = {2}
         >
        <PrimaryHeading>Ayush Bisht</PrimaryHeading>
        <PrimaryButton size = "small">
            Update medical summary
        </PrimaryButton>
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
