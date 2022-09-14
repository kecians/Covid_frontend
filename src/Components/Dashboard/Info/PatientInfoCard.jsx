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
import { useTheme } from "@mui/material";

const PatientInfoCard = (props) => {
  const { info = false } = props;
  const theme = useTheme()
  console.log(info);
  return info ? (
    <NativeCard
      gap={3}
      sx={{
        minWidth: "260px",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "inlineflex",
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
        <PatientConditionIndicator type={info.patient_condition_display} />
      </Box>
      <Box
        p={1}
        my={4}
        sx={{
          display: "inlineflex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "10px",
          height : "80px"
        }}
      >
        {info.patient_health_status &&
          Object.keys(info.patient_health_status).map((val) => (
            <Box align = "center">
              <SecondaryText sx = {{ color : theme.palette.text.dark}} >{val}</SecondaryText>
              <PrimaryHeading  mt={1} sx = {{ color : theme.palette.text.ternary}} >
                {info.patient_health_status[val]}
              </PrimaryHeading>
            </Box>
          ))}
      </Box>
      <SecondaryText align="center"
        sx = {{
          fontSize : theme.size.text.p2
        }}
      >
        <BsCalendarPlusFill  />
        &nbsp; Medicine Treatment at
        <SMText>8:00</SMText>
      </SecondaryText>
    </NativeCard>
  ) : (
    <Box sx={{ pt: 0.5 }}>
      <Skeleton variant="rectangular" width={210} height={118} />
      <Skeleton />
      <Skeleton width="60%" />
    </Box>
  );
};

export default PatientInfoCard;
