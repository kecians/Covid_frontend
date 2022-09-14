// import React from 'react'

// import Footer from "../../Components/Footer/Footer";
// import Nursehome from "../../Components/Nursehome/Nursehome";
// export default function Info() {
  //     return (
    //         <>
    //         <div className="container-fluid bg-silver">
    //             <Nursehome />
    //         </div>
    //         <div className="container-fluid p-0 m-0">
    //             <Footer />
    //         </div>
    //         </>
    //     )
    // }
    
import * as React from "react";
import { useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TabPanel from "../../Components/Dashboard/Info/TabPanel";
import RightSection from "../../Components/Dashboard/Info/RightSection";
import {MdSpaceDashboard} from "react-icons/md";
import {BsCalendarPlusFill} from "react-icons/bs";
import {CgProfile} from 'react-icons/cg';
import {FaClipboardList} from 'react-icons/fa';
import {TbHeartRateMonitor} from 'react-icons/tb';
import Searchbar from "../../Components/Searchbar/Searchbar";
import PatientList from "../../Components/Dashboard/PatientList";
import { getComputedStyle } from "./style.js";
import { CgLogOut } from "react-icons/cg";
import { Logout } from "../../Components/Logout/Logout";
import AddPatient from "../../Components/Dashboard/AddPatient";
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  
  };
}




export default function Dashboard() {

  const theme = useTheme();

  const [value, setValue] = React.useState("dashboard");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const styles = React.useMemo(()=>getComputedStyle(theme))
 

  return (
   
      <Grid container spacing={0} 
      
        sx={{
          height: "auto",
          maxWidth: "100vw",
          backgroundColor : theme.palette.v2.light,
        }}
      >
        <Grid item xs={1.1} 
        style = {styles.gridItem1}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            indicatorColor  = "primary"
            sx={styles.tabs}
          >

            <Tab value={"dashboard"} sx = {styles.tab}  iconPosition="top" icon= {<MdSpaceDashboard size = "2rem" />} label = "Dashboard" {...a11yProps("dashboard")} />
            {/* <Tab value={"calender"} sx = {styles.tab}  iconPosition="top" icon= {<BsCalendarPlusFill  size = "2rem"  />} label = "Schedule" {...a11yProps("calender")} /> */}
            <Tab value={"patients"} sx = {styles.tab} iconPosition="top" icon= {<CgProfile  size = "2rem" />} label = "Patients" {...a11yProps("patients")} />
            <Tab value={"add patient"} sx = {styles.tab}  iconPosition="top" icon= {<FaClipboardList  size = "2rem" />} label = "Add Patients" {...a11yProps("add patient")} />
            {/* <Tab value={"report"} sx = {styles.tab} iconPosition="top" icon= {   <TbHeartRateMonitor  size = "2rem" />}  label = "Report"{...a11yProps("report")} /> */}
            <Tab sx = {styles.tab} iconPosition="top"  icon= {   <Logout  size = "2rem" />}  label = "Logout"{...a11yProps("logout")} />
          
          </Tabs>
        </Grid>
        <Grid item xs={10.9} 
             sx = {{
                height : "auto !important"
             }}
            >
          <TabPanel value={value} index={"dashboard"} >
            <RightSection />
          </TabPanel>
          <TabPanel value={value} index={"calender"}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={"patients"}>
           <PatientList />
          </TabPanel>
          <TabPanel value={value} index={"add patient"}>
            <AddPatient />
          </TabPanel>
          <TabPanel value={value} index={"report"}>
          </TabPanel>
     
        </Grid>
      </Grid>
    
  );
}
