

import * as React from "react";
import { useTheme } from '@mui/styles';
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "../../Components/Dashboard/Info/TabPanel";
import RightSection from "../../Components/Dashboard/Info/RightSection";
import { MdSpaceDashboard } from "react-icons/md";
import { BsCalendarPlusFill } from "react-icons/bs";
import { CgProfile } from 'react-icons/cg';
import { FaClipboardList } from 'react-icons/fa';
import { TbHeartRateMonitor } from 'react-icons/tb';
import Searchbar from "../../Components/Searchbar/Searchbar";
import PatientList from "../../Components/Dashboard/PatientList";
import { getComputedStyle } from "./style.js";
import { CgLogOut } from "react-icons/cg";
import { Logout } from "../../Components/Logout/Logout";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AddPatient from "../../Components/Dashboard/AddPatient";
import cookie from 'react-cookies'
import { useContext } from "react";
import { ThemeContext } from "../../Components/RUCApi/ThemeContext";
import CoolBg from "../../Components/RUCApi/CoolBg";
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { store } from '../../Redux/store.js'
import { logout, loading } from "../../Redux/actions.js/auth.actions";
import { useHistory } from 'react-router-dom';




function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,

  };
}




function Dashboard() {

  const theme = useTheme();

  const [value, setValue] = React.useState("dashboard");
  const { mode, toggleTheme } = useContext(ThemeContext)
  const navigate = useHistory()


  const handleChange = (event, newValue) => {

    if (newValue === "mode") {
      toggleTheme()
    }
    else
      if (newValue === "logout") {

        store.dispatch(loading());
        setTimeout(() => {
          store.dispatch(logout(navigate));
        }, 1000);
      }
      else
        setValue(newValue);
  };

  const styles = React.useMemo(() => getComputedStyle(theme), [mode])


  return (

    <Grid container spacing={0}

      sx={{
        height: "auto",
        maxWidth: "100vw",
        backgroundColor: theme.palette.v2.light,
        '& .coolBg': {
          position: "fixed",
          top: "0px",
          right: "-25px",
          zIndex: "0",
          ' & path': {
            fillOpacity: "0.03"
          }
        },
      }}
    >
      <CoolBg />
      <Grid item xs={1.1}
        style={styles.gridItem1}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          indicatorColor="primary"
          sx={styles.tabs}
        >

          <Tab value={"dashboard"} sx={styles.tab} iconPosition="top" icon={<MdSpaceDashboard size="2rem" />} label="Dashboard" {...a11yProps("dashboard")} />
          {/* <Tab value={"calender"} sx = {styles.tab}  iconPosition="top" icon= {<BsCalendarPlusFill  size = "2rem"  />} label = "Schedule" {...a11yProps("calender")} /> */}
          <Tab value={"patients"} sx={styles.tab} iconPosition="top" icon={<CgProfile size="2rem" />} label="Patients" {...a11yProps("patients")} />
          <Tab value={"add patient"} sx={styles.tab} iconPosition="top" icon={<FaClipboardList size="2rem" />} label="Add Patients" {...a11yProps("add patient")} />
          {/* <Tab value={"report"} sx = {styles.tab} iconPosition="top" icon= {   <TbHeartRateMonitor  size = "2rem" />}  label = "Report"{...a11yProps("report")} /> */}
          <Tab value={"logout"} sx={styles.tab} iconPosition="top" icon={<CgLogOut size="2rem" />} label="Logout"{...a11yProps("logout")} />
          <Tab value={"mode"} sx={styles.tab} iconPosition="top" icon={mode === "light" ? <DarkModeIcon /> : <Brightness7Icon />} label={mode === "light" ? "dark" : "light"} {...a11yProps("mode")} />

        </Tabs>
      </Grid>
      <Grid item xs={10.9}
        sx={{
          height: "auto !important",
        }}
      >
        <TabPanel value={value} index={"dashboard"} >
          <RightSection />
        </TabPanel>
        <TabPanel value={value} index={"patients"}>
          <PatientList />
        </TabPanel>
        <TabPanel value={value} index={"add patient"}>
          <AddPatient />
        </TabPanel>

      </Grid>
    </Grid>

  );
}



Dashboard.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { logout, loading })(Dashboard);
