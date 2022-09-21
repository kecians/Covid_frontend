import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { NativeCard } from "../../RUCApi/Cards";
import {
  PrimaryText,
  SecondaryText,
  PrimaryHeading,
  SMText,
} from "../../RUCApi/Text";
import { PatientConditionIndicator } from "../../RUCApi/PatientsUtils";
import Skeleton from "@mui/material/Skeleton";
import { useTheme } from '@mui/styles';
import { Stack } from "@mui/material";

const PatientInfoCard = (props) => {
  const { info = false } = props;
  const theme = useTheme()
  console.log(info);
  return info ? (
    <NativeCard
      gap={3}
      sx={{
        minWidth: "260px",
        maxWidth : "273px",
        height : "auto"
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "nowrap",
            '& svg' : {
              color : theme.palette.v2.secondary,
              fontSize : "22px"
            }
          }}
          height="40px"
        >
          <PrimaryText
            maxWidth="200px"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              '& svg' : {
                color : theme.palette.v2.secondary,
                fontSize : "24px"
              },
              fontSize : theme.size.text.p1
            }}
            title={info.name}
          >
            {info.id}. {info.name}
          </PrimaryText>
          <IoMdNotifications />
        </Box>
        <PatientConditionIndicator type={info.patient_condition} />
      </Box>
      <Box
        p={1}
        my={4}
        sx={{
          display: "inlineflex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          height : "80px",
          fontSize : theme.size.text.p1
        }}
      >
        
        {info.patient_health_status?
          Object.keys(info.patient_health_status).map((val) => (
            <Box align = "center">
              <SecondaryText sx = {{ color : theme.palette.text.dark, fontSize : theme.size.text.p2}} >{val}</SecondaryText>
              <PrimaryHeading  mt={1} sx = {{ color : theme.palette.text.ternary, fontSize : theme.size.text.p1 }} >
                {info.patient_health_status[val]}
              </PrimaryHeading>
            </Box>
          )) : "" }
      </Box>
      <SecondaryText align="center"
        sx = {{
          fontSize : theme.size.text.p3
        }}
      >
        <BsCalendarPlusFill  />
        &nbsp; Medicine Treatment at
        <SMText sx = {{ fontSize : theme.size.text.p3 }}> { info.updated_on && new Date(info.updated_on).toDateString()}</SMText>
      </SecondaryText>
    </NativeCard>
  ) : (
    <Stack sx={{ pt: 0.5 }} >
      <Skeleton variant="rectangular" width={"210px"} height={"118px"} />
      <Skeleton width="180px" height={"20px"}  />
      <Skeleton width="100px" height={"20px"}  />
    </Stack>
  );
};

export default PatientInfoCard;
