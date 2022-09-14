import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { NativeText, SecondaryHeading, SMText } from "../../RUCApi/Text";
import Container from "@mui/material/Container";
import PatientList from "./PatientList";
import axios from "axios";
import cookie from "react-cookies";
import { patientSearch } from "../../../Api/patient.api";
import { useTheme } from "@mui/material";
import { getComputedStyle } from "./style";
import { useEffect } from "react";



const PatientStatus = () => {

  const initialState = {
    show: false,
    loading: false,
    query: "active",
    data: [],
  };

  const [state, setState] = React.useState(initialState);
  const [query_val, setQuery] = React.useState("active");

  // const handleChange = (event, value) =>{
  //     setState({ ...state, [event.target.name]: event.target.value,
  //     });
  //   }

  useEffect(() => {
    handleSearch();
  }, [query_val]);

  const handleChange = (event, value) => {
    setQuery(value);
  };
  const theme = useTheme();
  const styles = getComputedStyle(theme);

  const handleSearch = () => {
    console.log(query_val);
    setState({ ...state, loading: true });

    axios({
      url: patientSearch + `${query_val}/`,
      method: "GET",
      headers: {
        Authorization: `Token ${cookie.load("token")}`,
      },
    })
      .then((res) => {
        if (res.data.status === 404) {
          setState({ ...state, show: true, loading: false, data: [] });
        } else {
          setState({ ...state, show: true, data: res.data.data  });
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
        width: "100%",
        overflow: "hidden",
      }}
    >
      <SecondaryHeading
        sx={{
          padding: "10px 20px 10px 0px",
          fontWeight: "500",
        }}
      >
        Patient Status
      </SecondaryHeading>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: theme.palette.v2.primary,
          borderRadius: "20px",
          width: "100%",
        }}
      >
        <Tabs
          value={query_val}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons={false}
          aria-label="scrollable prevent tabs example"
          sx={styles.tabs}
        >
          <Tab
            sx={styles.tab}
            value="all"
            label={<NativeText> All </NativeText>}
          />
          <Tab
            sx={styles.tab}
            value="active"
            label={<NativeText> Active </NativeText>}
          />
          <Tab
            sx={styles.tab}
            value="recovered"
            label={<NativeText>Recovered </NativeText>}
          />
          <Tab
            sx={styles.tab}
            value="death"
            label={<NativeText> Death</NativeText>}
          />
          <Tab
            sx={styles.tab}
            value="migrated"
            label={<NativeText> Migrated</NativeText>}
          />
        </Tabs>
      </Box>
      <PatientList data={state.data} />
    </Box>
  );
};

export default PatientStatus;
