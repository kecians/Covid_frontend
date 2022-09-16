import styled from "@emotion/styled";
import { Box } from "@mui/system";
import React from "react";
import PatientInfoCard from "./PatientInfoCard";
import PatientStatus from "./PatientStatus";

const PatientFlex = styled(Box)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  gap: 20px;
  overflow: hidden !important;
  width: 100%;
`;

const PatientList = (props) => {
  const { data = [] } = props;

  return (
    <PatientFlex my={3}>
      {data &&
        data.map((val, ind) => (
          <PatientInfoCard info={val} key={val.patient_id} />
        ))}
      {data.length === 0 ? <>
        <PatientInfoCard  />
        <PatientInfoCard  />
        <PatientInfoCard  />
        <PatientInfoCard  />
        <PatientInfoCard  />

      </> : "" }
    </PatientFlex>
  );
};

export default PatientList;
