import { SecondaryHeading, SMText } from "../../RUCApi/Text";
import * as React from "react";
import { Box } from "@mui/system";
import { NativeCard } from "../../RUCApi/Cards";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  PatientCategoryStatusCard,
  BedOccupancyStatusCard,
} from "../../RUCApi/Cards";
import cookie from "react-cookies";
import axios from "axios";
import { allotedBeds, patientCount } from "../../../Api/patient.api";
import { CovidCaseCard } from "../../RUCApi/Cards";

const ShiftStatus = () => {
  const [state, setState] = React.useState({});
  const [data, setData] = React.useState({});
  const [count, setCount] = React.useState(0);
  const [status, setStatus] = React.useState({});
  const [total_vacant_beds, setTotalVacant] = React.useState(0)
  const colorOption = ["red", "blue", "green", "yellow", "orange", "purple"];
  const [patient_count, setPatientCount] = React.useState([]);

  const getPatientCount = () => {
    axios({
      url: patientCount,
      method: "GET",
    })
      .then((res) => {
        if (res.data.status === 404) {
        } else {
          setPatientCount(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  React.useEffect(() => {
    axios({
      url: allotedBeds,
      method: "GET",
    })
      .then((res) => {
        if (res.data.status === 404) {
        } else {
          setState(res.data.total_beds);

          const bed_status = [
            {
              id: "general",
              label: "general",
              value: res.data.total_beds.general -   res.data.alloted_beds.general,
            },
            {
              id: "oxygen",
              label: "oxygen",
              value: res.data.total_beds.oxygen -  res.data.alloted_beds.oxygen,
            },
            {
              id: "icu",
              label: "icu",
              value: res.data.total_beds.icu-  res.data.alloted_beds.icu,
            },
            {
              id: "ventillator",
              label: "ventillator",
              value: res.data.total_beds.ventillator -  res.data.alloted_beds.ventillator,
            },
          ];

          setData(bed_status);
          setCount(res.data.data.length);
          const patient_status = Object.keys(res.data.patient_status).map(
            (val, ind) => ({
              id: val,
              label: val,
              value: res.data.patient_status[val],
            })
          );
          setStatus(patient_status);

          setTotalVacant( res.data.total_beds.total -  res.data.alloted_beds.total)
        }
      })
      .catch((err) => {
        console.log(err.response);
      });

    getPatientCount();
  }, []);

  return (
    <Box mt={1} w="100%">
      {/* <SecondaryHeading>Shift status</SecondaryHeading> */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          py: 1,
          overflow: "auto",
          width: "100%",
        }}
        mt={2}
      >
        <BedOccupancyStatusCard data={data} vacant_beds = {total_vacant_beds } />
        <PatientCategoryStatusCard data={status} />
        <CovidCaseCard data={patient_count} />
      </Box>
    </Box>
  );
};

export default ShiftStatus;
