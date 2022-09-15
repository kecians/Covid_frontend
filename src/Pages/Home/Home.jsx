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
    import Addpatient from "../../Components/Addpatient/Addpatient";
    import { CgLogOut } from "react-icons/cg";
    import { Logout } from "../../Components/Logout/Logout";
import HospitalInfo from "../../Components/PublicDash/Info/HospitalStats";
import PatientLogin from "../../Components/PublicDash/PatientLogin";
import StaffLogin from "../../Components/PublicDash/Staff";

    function a11yProps(index) {
      return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
      
      };
    }
    
    
    
    
    export default function Home() {
    
      const theme = useTheme();
    
      const [value, setValue] = React.useState("info");
    
      const handleChange = (event, newValue) => {
        console.log(newValue)
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
                <Tab value = {"info"} sx = {styles.tab}  iconPosition="top" icon= {<MdSpaceDashboard size = "2rem" />} label = "Info" {...a11yProps("info")} />
                <Tab  value = {"patient"} sx = {styles.tab}  iconPosition="top" icon= {<BsCalendarPlusFill  size = "2rem"  />} label = "Patient" {...a11yProps("patient")} />
                <Tab value = {"staff"} sx = {styles.tab} iconPosition="top" icon= {<CgProfile  size = "2rem" />} label = "Staff" {...a11yProps("staff")} />
              </Tabs>
            </Grid>
            <Grid item xs={10.9} 
                 sx = {{
                    height : "auto !important"
                 }}
                >
              <TabPanel value={value} index={"info"} >
                <RightSection  />
              </TabPanel>
              <TabPanel value={value} index={"patient"}>
                 <PatientLogin />
              </TabPanel>
              <TabPanel value={value} index={"staff"}>
                 <StaffLogin />
              </TabPanel>
            
         
            </Grid>
          </Grid>
        
      );
    }
    