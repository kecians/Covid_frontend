import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SecondaryHeading, SMText } from "../../RUCApi/Text";
import Container from "@mui/material/Container";
import PatientList from "./PatientList";
import axios from "axios";
import cookie from "react-cookies";
import { patientSearch } from "../../../Api/patient.api";

const PatientStatus = () => {
  const initialState = {
    show: false,
    loading: false,
    query: "recovered",
    data: [],
  };
  const [state, setState] = React.useState(initialState);
  const [query_val, setQuery] = React.useState("recovered");
  // const handleChange = (event, value) =>{
  //     setState({ ...state, [event.target.name]: event.target.value,
  //     });
  //   }

  const handleChange = (event, value) => {
    setState({ ...state, query: value });
    setQuery(value);

    setState({ ...state, loading: true });

    axios({
      url: patientSearch + `${value}/`,
      method: "GET",
      headers: {
        Authorization: `Token ${cookie.load("token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          setState({ ...state, show: true, loading: false, data: [] });
        } else {
          setState({ ...state, show: true, data: res.data.data.reverse() });
        }
      })
      .catch((err) => {
        setState({ ...state, show: true, loading: false, data: [] });
      });
    setState({ ...state, loading: false });
  };
  return (
    <Box
      sx={{
        marginTop: "30px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <SecondaryHeading
          sx={{
            padding: "10px 20px 10px 0px",
          }}
        >
          Patient Status
        </SecondaryHeading>
        <Tabs
          value={query_val}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
        >
          <Tab value="active" icon={<SMText> By order </SMText>} />
          <Tab value="recovered" icon={<SMText>By status </SMText>} />
          <Tab value="death" icon={<SMText> By schedule </SMText>} />
        </Tabs>
      </Box>
      <Box>
        <PatientList data={state.data} />
      </Box>
    </Box>
  );
};

export default PatientStatus;
