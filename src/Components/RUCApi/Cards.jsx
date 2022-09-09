import * as React from "react";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import { PrimaryText, SecondaryText, SMText } from "./Text";
import { Box } from "@mui/system";
import { PieChart } from "./Charts/PieChart";
import { BsCalendarPlusFill } from "react-icons/bs";
import { IoMdBed } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import Skeleton from "@mui/material/Skeleton";

export const NativeCard = styled((props) => <Card {...props} />)`
  background: white;
  border-radius: 10px;
  min-width: 100px;
  max-height: unset;
  min-height: 80px;
  height: auto;
  width: auto;
  padding: 10px 15px;
`;

export const BedOccupancyStatusCard = (props) => {
  const { data = [] } = props;
  return (
    <NativeCard>
      {data.length ? (
        <>
          <Box>
            <SMText>Occupancy</SMText>
            <SMText>Normal</SMText>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <PieChart data={data} />
          </Box>
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={"200px"} height={118} />
          <Skeleton width="100%" height={60} />
        </>
      )}
    </NativeCard>
  );
};

export const PatientCategoryStatusCard = (props) => {
  const { data = [] } = props;
  return (
    <NativeCard>
      {data.length ? (
        <>
          <Box>
            <SMText>Patient status</SMText>
          </Box>
          <Box
            sx={{
              width: "300px",
              height: "180px",
            }}
          >
            <PieChart data={data} />
          </Box>
        </>
      ) : (
        <>
          <Skeleton variant="rectangular" width={"200px"} height={118} />
          <Skeleton width="100%" height={60} />
        </>
      )}
    </NativeCard>
  );
};

export const PatientStatusCard = (props) => {
  return (
    <NativeCard>
      <Box>
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <PrimaryText>
            <IoMdBed /> 1 Ayush Bisht
          </PrimaryText>
          <IoMdNotifications />
        </Box>
      </Box>
      <Box></Box>
      <SecondaryText>
        <BsCalendarPlusFill />
        Medicine Treatment at
        <SMText>8:00</SMText>
      </SecondaryText>
    </NativeCard>
  );
};
