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
  const [total_vacant_beds, setTotalVacant] = React.useState(0);
  const [timestamp_patient_count, setTimestampPatientCount] = React.useState( [] );

  const [patient_count, setPatientsCount] = React.useState({
    active_patient: 0,
    total_patient: 0,
    todays_patient : 0
  });

  const getPatientCount = () => {
    axios({
      url: patientCount,
      method: "GET",
    })
      .then((res) => {
        if (res.data.status === 404) {
        } else {
          setTimestampPatientCount(res.data.data);
          setPatientsCount ( (state) => ({...state, todays_patient : res.data.data.length ?  res.data.data[ res.data.data.length - 1  ].y : 0}))
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
              value:
                res.data.total_beds.general - res.data.alloted_beds.general,
            },
            {
              id: "oxygen",
              label: "oxygen",
              value: res.data.total_beds.oxygen - res.data.alloted_beds.oxygen,
            },
            {
              id: "icu",
              label: "icu",
              value: res.data.total_beds.icu - res.data.alloted_beds.icu,
            },
            {
              id: "ventillator",
              label: "ventillator",
              value:
                res.data.total_beds.ventillator -
                res.data.alloted_beds.ventillator,
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

          setPatientsCount((state) => ({
            ...state,
            active_patient: res.data.patient_status.active,
            total_patient: patient_status.reduce(
              (total, cur) => total + cur.value,
              0
            ),
          }));

          setStatus(patient_status);

          setTotalVacant(
            res.data.total_beds.total - res.data.alloted_beds.total
          );
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
        <BedOccupancyStatusCard data={data} vacant_beds={total_vacant_beds} />
        <PatientCategoryStatusCard data={status} count = {patient_count.total_patient} />
        <CovidCaseCard data={timestamp_patient_count} count = {patient_count.todays_patient} />
      </Box>
    </Box>
  );
};

export default ShiftStatus;
