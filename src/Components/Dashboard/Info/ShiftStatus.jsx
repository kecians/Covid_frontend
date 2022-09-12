import { SecondaryHeading, SMText } from "../../RUCApi/Text";
import * as React from "react";
import { Box } from "@mui/system";
import { NativeCard } from "../../RUCApi/Cards";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { PatientCategoryStatusCard, BedOccupancyStatusCard } from "../../RUCApi/Cards";
import cookie from 'react-cookies'
import axios from 'axios'
import { allotedBeds } from "../../../Api/patient.api";
import { CovidCaseCard } from "../../RUCApi/Cards";





const ShiftStatus = () => {
  const [state, setState] = React.useState({})
  const [data, setData] = React.useState({})
  const [count, setCount] = React.useState(0)
  const [status, setStatus] = React.useState({})
  const colorOption = ["red", "blue", "green", "yellow", "orange", "purple"]

  React.useEffect(() => {
      axios({
          url: allotedBeds,
          method: 'GET',
          headers: {
            Authorization: `Token ${cookie.load('token')}`,
          },
        })
        .then((res) => {
          if (res.data.status === 404) {
            
          } else {
            setState(res.data.total_beds)
            const bed_status = Object.keys(res.data.alloted_beds).map( (val, ind )=> (val !="total" &&{
              id : val,
              label : val,
              value :   res.data.alloted_beds[val],
              color : colorOption[ind]
            }))

       
            setData(bed_status)
            setCount(res.data.data.length)
            const patient_status = Object.keys(res.data.patient_status).map( (val, ind )=> ( {
              id : val,
              label : val,
              value :   res.data.patient_status[val],
              color : colorOption[ind]
            }))
            setStatus(patient_status)
          }
        })
        .catch((err) => {
          console.log(err.response);
        });
  }, [])

  return (
    <Box
      mt = {1}
      w = "100%"
      
    >
      {/* <SecondaryHeading>Shift status</SecondaryHeading> */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          py: 1,
          overflow: "auto",
          width: "100%",
           
        }}
        mt = {2}
      >
        <BedOccupancyStatusCard data = {data} />
        <PatientCategoryStatusCard data = {status}  />
        <CovidCaseCard data = {status} />
      </Box>
    </Box>
  );
};

export default ShiftStatus;
